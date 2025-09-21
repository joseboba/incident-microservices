import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateIncidentDetailStatusCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IncidentDetailEntity,
  IncidentDetailStatusEntity,
  IncidentEntity,
  IncidentStatusHistoryEntity,
} from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';
import { GetUserAppByEmailAdapter } from '../../../../infrastructure/microservices-adapters';
import { IncidentDetailStatusEnum } from '@enums';

@CommandHandler(UpdateIncidentDetailStatusCommand)
export class UpdateIncidentDetailStatusHandler
  implements ICommandHandler<UpdateIncidentDetailStatusCommand>
{
  private readonly _logger = new Logger(UpdateIncidentDetailStatusHandler.name);

  constructor(
    @InjectRepository(IncidentEntity)
    private readonly _incidentRepository: Repository<IncidentEntity>,
    @InjectRepository(IncidentDetailStatusEntity)
    private readonly _incidentDetailStatusRepository: Repository<IncidentDetailStatusEntity>,
    @InjectRepository(IncidentDetailEntity)
    private readonly _incidentDetailRepository: Repository<IncidentDetailEntity>,
    @InjectRepository(IncidentStatusHistoryEntity)
    private readonly _incidentDetailStatusHistory: Repository<IncidentStatusHistoryEntity>,
    private readonly _getUserAppByUserAppIdAdapter: GetUserAppByEmailAdapter,
  ) {}

  async execute(command: UpdateIncidentDetailStatusCommand) {
    const {
      user,
      incidentDetailId,
      prevIncidentDetailStatus,
      nextIncidentDetailStatus,
    } = command;

    const userApp = await this._getUserAppByUserAppIdAdapter.execute(
      user.email,
    );

    if (!user.isTechnical) {
      throw BusinessErrors.UserIsNotAdministrator;
    }

    const incidentDetail = await this._incidentDetailRepository.findOne({
      where: { incidentDetailId },
      relations: { incident: true, incidentDetailStatus: true },
    });

    if (!incidentDetail) {
      throw BusinessErrors.IncidentDetailNotExist;
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

    if (
      incidentDetail.incidentDetailStatus.incidentDetailStatusCode !==
      prevIncidentDetailStatus.toString()
    ) {
      throw BusinessErrors.IncidentDetailIsNotInCorrectStatus;
    }

    const incidentStatus = await this._incidentDetailStatusRepository.findOneBy(
      {
        incidentDetailStatusCode: nextIncidentDetailStatus.toString(),
      },
    );

    incidentDetail.incidentDetailStatus = incidentStatus!;
    await this._incidentDetailRepository.save(incidentDetail);

    const incidentDetailHistory = new IncidentStatusHistoryEntity();
    incidentDetailHistory.incidentDetailStatus = incidentStatus!;
    incidentDetailHistory.incidentDetail = incidentDetail;
    incidentDetailHistory.incidentStatusDate = new Date();
    incidentDetailHistory.updatedByUserAppId = userApp.userAppId;

    await this._incidentDetailStatusHistory.save(incidentDetailHistory);

    if (nextIncidentDetailStatus !== IncidentDetailStatusEnum.FIN) return;

    const completedItems = await this._incidentDetailRepository.countBy({
      incidentDetailStatus: {
        incidentDetailStatusCode: IncidentDetailStatusEnum.FIN.toString(),
      },
      incident: { incidentId: incident.incidentId },
    });

    const totalDetails = await this._incidentDetailRepository.countBy({
      incident: { incidentId: incident.incidentId },
    });

    if (completedItems !== totalDetails) return;

    incident.isCompleted = true;
    incident.completedDate = new Date();
    await this._incidentRepository.save(incident);
  }
}
