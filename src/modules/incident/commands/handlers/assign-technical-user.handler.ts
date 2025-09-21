import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AssignTechnicalUserCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IncidentDetailEntity,
  IncidentDetailStatusEntity,
  IncidentEntity,
  IncidentStatusHistoryEntity,
} from '@entities';
import { Repository } from 'typeorm';
import { GetUserAppByEmailAdapter } from '../../../../infrastructure/microservices-adapters';
import { BusinessErrors } from '../../errors/business-error';
import { IncidentDetailStatusEnum } from '@enums';

@CommandHandler(AssignTechnicalUserCommand)
export class AssignTechnicalUserHandler
  implements ICommandHandler<AssignTechnicalUserCommand>
{
  private readonly _logger = new Logger(AssignTechnicalUserHandler.name);

  constructor(
    @InjectRepository(IncidentDetailEntity)
    private readonly _incidentDetailRepository: Repository<IncidentDetailEntity>,
    @InjectRepository(IncidentEntity)
    private readonly _incidentRepository: Repository<IncidentEntity>,
    @InjectRepository(IncidentDetailStatusEntity)
    private readonly _incidentDetailStatusRepository: Repository<IncidentDetailStatusEntity>,
    @InjectRepository(IncidentStatusHistoryEntity)
    private readonly _incidentStatusHistoryRepository: Repository<IncidentStatusHistoryEntity>,
    private readonly _getUserAppByUserAppIdAdapter: GetUserAppByEmailAdapter,
  ) {}

  async execute(command: AssignTechnicalUserCommand) {
    this._logger.log('Init AssignTechnicalUserHandler');

    const { assignTechnicalUser, incidentDetailId, user } = command;

    if (!user.isAdmin) {
      throw BusinessErrors.UserIsNotAdministrator;
    }

    const incidentDetail = await this._incidentDetailRepository.findOne({
      where: { incidentDetailId },
      relations: { incidentDetailStatus: true, incident: true },
    });

    if (!incidentDetail) {
      throw BusinessErrors.IncidentDetailNotExist;
    }

    if (
      incidentDetail.incidentDetailStatus.incidentDetailStatusCode !==
      IncidentDetailStatusEnum.PEN_ASG.toString()
    ) {
      throw BusinessErrors.IncidentDetailStatusIsNotValid;
    }

    const userApp = await this._getUserAppByUserAppIdAdapter.execute(
      assignTechnicalUser.technicianUserAppEmail,
    );

    if (!userApp.isActive) {
      throw BusinessErrors.TechnicalUserIsInactive;
    }

    if (!userApp.userType.isTechnical) {
      throw BusinessErrors.UserIsNotATechnicalUser;
    }

    const incident = await this._incidentRepository.findOneBy({
      incidentId: incidentDetail.incident.incidentId,
    });

    if (!incident) {
      throw BusinessErrors.IncidentDoesNotExist;
    }

    if (incident.isCompleted) {
      throw BusinessErrors.IncidentIsAlreadyCompleted;
    }

    const incidentStatus = await this._incidentDetailStatusRepository.findOneBy(
      {
        incidentDetailStatusCode: IncidentDetailStatusEnum.ASG,
      },
    );

    incidentDetail.incidentDetailStatus = incidentStatus!;
    incidentDetail.technicianUserAppId = userApp.userAppId;
    await this._incidentDetailRepository.save(incidentDetail);

    const userInSession = await this._getUserAppByUserAppIdAdapter.execute(
      user.email,
    );

    const incidentStatusHistory = new IncidentStatusHistoryEntity();
    incidentStatusHistory.incidentDetailStatus = incidentStatus!;
    incidentStatusHistory.incidentDetail = incidentDetail;
    incidentStatusHistory.incidentStatusDate = new Date();
    incidentStatusHistory.updatedByUserAppId = userInSession.userAppId;

    await this._incidentStatusHistoryRepository.save(incidentStatusHistory);

    if (incident.inProgress) return;

    incident.inProgress = true;
    await this._incidentRepository.save(incident);
  }
}
