import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterIncidentPriorityLevelCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentPriorityLevelEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(RegisterIncidentPriorityLevelCommand)
export class RegisterIncidentPriorityLevelHandler
  implements ICommandHandler<RegisterIncidentPriorityLevelCommand>
{
  constructor(
    @InjectRepository(IncidentPriorityLevelEntity)
    private readonly _incidentPriorityLevelRepository: Repository<IncidentPriorityLevelEntity>,
  ) {}

  async execute(
    command: RegisterIncidentPriorityLevelCommand,
  ): Promise<IncidentPriorityLevelEntity> {
    const { incidentPriorityLevelDto } = command;

    const incidentPriorityLevel =
      await this._incidentPriorityLevelRepository.findOneBy({
        incidentPriorityLevelCode:
          incidentPriorityLevelDto.incidentPriorityLevelCode,
      });

    if (incidentPriorityLevel) {
      throw BusinessErrors.IncidentPriorityLevelCodeAlreadyExist;
    }

    const saveEntity = new IncidentPriorityLevelEntity();
    Object.assign(saveEntity, incidentPriorityLevelDto);
    return this._incidentPriorityLevelRepository.save(saveEntity);
  }
}
