import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterIncidentCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IncidentEntity,
  IncidentPriorityLevelEntity,
  IncidentTypeEntity,
} from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';
import { GetUserAppByEmailAdapter } from '../../../../infrastructure/microservices-adapters/get-user-app-by-email-adapter.service';

@CommandHandler(RegisterIncidentCommand)
export class RegisterIncidentHandler
  implements ICommandHandler<RegisterIncidentCommand>
{
  constructor(
    @InjectRepository(IncidentEntity)
    private readonly _incidentRepository: Repository<IncidentEntity>,
    @InjectRepository(IncidentPriorityLevelEntity)
    private readonly _incidentPriorityLevelRepository: Repository<IncidentPriorityLevelEntity>,
    @InjectRepository(IncidentTypeEntity)
    private readonly _incidentTypeRepository: Repository<IncidentTypeEntity>,
    private readonly _qetUserAppByUserAppIdAdapter: GetUserAppByEmailAdapter,
  ) {}

  async execute(command: RegisterIncidentCommand): Promise<IncidentEntity> {
    const { registerIncidentDto, email } = command;
    const { incidentTypeCode, incidentPriorityLevelCode, description } =
      registerIncidentDto;

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

    const userApp = await this._qetUserAppByUserAppIdAdapter.execute(email);

    if (!userApp.isActive) {
      throw BusinessErrors.IncidentUserAppIsNotActive;
    }

    const saveEntity = new IncidentEntity();
    saveEntity.description = description;
    saveEntity.reportedDate = new Date();
    saveEntity.incidentType = incidentType;
    saveEntity.incidentPriorityLevel = incidentPriorityLevel;
    saveEntity.reportUserAppId = userApp.userAppId;

    return this._incidentRepository.save(saveEntity);
  }
}
