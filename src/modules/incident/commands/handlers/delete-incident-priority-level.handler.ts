import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteIncidentPriorityLevelCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IncidentPriorityLevelEntity,
} from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(DeleteIncidentPriorityLevelCommand)
export class DeleteIncidentPriorityLevelHandler
  implements ICommandHandler<DeleteIncidentPriorityLevelCommand>
{
  private readonly _logger = new Logger(
    DeleteIncidentPriorityLevelHandler.name,
  );

  constructor(
    @InjectRepository(IncidentPriorityLevelEntity)
    private readonly _incidentPriorityLevelRepository: Repository<IncidentPriorityLevelEntity>,
  ) {}

  async execute(command: DeleteIncidentPriorityLevelCommand) {
    this._logger.log('Init command handler');
    const { incidentPriorityLevelCode } = command;

    const incidentPriorityLevel =
      await this._incidentPriorityLevelRepository.findOneBy({
        incidentPriorityLevelCode,
      });

    if (!incidentPriorityLevel) {
      throw BusinessErrors.NotFoundIncidentPriorityLevel;
    }

    await this._incidentPriorityLevelRepository.remove(incidentPriorityLevel);
  }
}
