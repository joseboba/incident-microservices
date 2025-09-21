import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterIncidentCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IncidentDetailEntity,
  IncidentDetailStatusEntity,
  IncidentEntity,
  IncidentPriorityLevelEntity,
  IncidentStatusHistoryEntity,
  IncidentTypeEntity,
} from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';
import { GetUserAppByEmailAdapter } from '../../../../infrastructure/microservices-adapters';
import { IncidentDetailStatusEnum } from '@enums';

@CommandHandler(RegisterIncidentCommand)
export class RegisterIncidentHandler
  implements ICommandHandler<RegisterIncidentCommand>
{
  constructor(
    @InjectRepository(IncidentEntity)
    private readonly _incidentRepository: Repository<IncidentEntity>,
    @InjectRepository(IncidentDetailEntity)
    private readonly _incidentDetailRepository: Repository<IncidentDetailEntity>,
    @InjectRepository(IncidentPriorityLevelEntity)
    private readonly _incidentPriorityLevelRepository: Repository<IncidentPriorityLevelEntity>,
    @InjectRepository(IncidentTypeEntity)
    private readonly _incidentTypeRepository: Repository<IncidentTypeEntity>,
    @InjectRepository(IncidentDetailStatusEntity)
    private readonly _incidentDetailStatusRepository: Repository<IncidentDetailStatusEntity>,
    @InjectRepository(IncidentStatusHistoryEntity)
    private readonly _incidentStatusHistoryRepository: Repository<IncidentStatusHistoryEntity>,
    private readonly _getUserAppByUserAppIdAdapter: GetUserAppByEmailAdapter,
  ) {}

  async execute(command: RegisterIncidentCommand): Promise<IncidentEntity> {
    const { registerIncidentDto, email } = command;
    const {
      incidentTypeCode,
      incidentPriorityLevelCode,
      description,
      details,
    } = registerIncidentDto;

    const incidentType = await this._incidentTypeRepository.findOneBy({
      incidentTypeCode,
    });

    if (!incidentType) {
      throw BusinessErrors.NotFoundIncidentType;
    }

    if (!incidentType.isActive) {
      throw BusinessErrors.IncidentTypeIsNotActive;
    }

    const incidentPriorityLevel =
      await this._incidentPriorityLevelRepository.findOneBy({
        incidentPriorityLevelCode,
      });

    if (!incidentPriorityLevel) {
      throw BusinessErrors.NotFoundIncidentPriorityLevel;
    }

    if (!incidentPriorityLevel.isActive) {
      throw BusinessErrors.IncidentPriorityLevelIsNotActive;
    }

    const userApp = await this._getUserAppByUserAppIdAdapter.execute(email);

    if (!userApp.isActive) {
      throw BusinessErrors.IncidentUserAppIsNotActive;
    }

    const saveEntity = new IncidentEntity();
    saveEntity.description = description;
    saveEntity.reportedDate = new Date();
    saveEntity.incidentType = incidentType;
    saveEntity.incidentPriorityLevel = incidentPriorityLevel;
    saveEntity.reportUserAppId = userApp.userAppId;

    const saveResult = await this._incidentRepository.save(saveEntity);
    const saveDetailsEntity: IncidentDetailEntity[] = [];

    const status = await this._incidentDetailStatusRepository.findOneBy({
      incidentDetailStatusCode: IncidentDetailStatusEnum.PEN_ASG,
    });

    for (const detail of details) {
      const saveDetailEntity = new IncidentDetailEntity();
      saveDetailEntity.incident = saveResult;

      saveDetailEntity.description = detail.description;
      saveDetailEntity.incidentDetailStatus = status!;
      saveDetailEntity.equipmentId = detail.equipmentId;
      saveDetailEntity.equipmentLocationId = detail.equipmentLocationId;
      saveDetailsEntity.push(saveDetailEntity);
    }

    const detailEntities =
      await this._incidentDetailRepository.save(saveDetailsEntity);

    const statusHistories = detailEntities.map((e) => {
      const statusHistory = new IncidentStatusHistoryEntity();
      statusHistory.incidentDetailStatus = e.incidentDetailStatus;
      statusHistory.incidentDetail = e;
      statusHistory.incidentStatusDate = new Date();
      statusHistory.updatedByUserAppId = userApp.userAppId;

      return statusHistory;
    });

    await this._incidentStatusHistoryRepository.save(statusHistories);

    const findResult = await this._incidentRepository.findOne({
      where: { incidentId: saveResult.incidentId },
      relations: { incidentDetails: true },
    });

    return findResult ?? saveResult;
  }
}
