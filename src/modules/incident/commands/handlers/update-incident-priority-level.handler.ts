import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateIncidentPriorityLevelCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IncidentPriorityLevelEntity,
} from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(UpdateIncidentPriorityLevelCommand)
export class UpdateIncidentPriorityLevelHandler
  implements ICommandHandler<UpdateIncidentPriorityLevelCommand>
{
  private readonly _logger = new Logger(
    UpdateIncidentPriorityLevelHandler.name,
  );

  constructor(
    @InjectRepository(IncidentPriorityLevelEntity)
    private readonly _incidentPriorityLevelRepository: Repository<IncidentPriorityLevelEntity>,
  ) {}

  async execute(command: UpdateIncidentPriorityLevelCommand): Promise<void> {
    this._logger.log('Init command handler');
    const { updateIncidentPriorityLevelDto, incidentPriorityLevelCode } =
      command;

    const incidentPriorityLevel =
      await this._incidentPriorityLevelRepository.findOneBy({
        incidentPriorityLevelCode,
      });

    if (!incidentPriorityLevel) {
      throw BusinessErrors.NotFoundIncidentPriorityLevel;
    }

    Object.assign(incidentPriorityLevel, updateIncidentPriorityLevelDto);
    await this._incidentPriorityLevelRepository.save(incidentPriorityLevel);
  }
}
