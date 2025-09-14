import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateIncidentTypeCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentTypeEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(UpdateIncidentTypeCommand)
export class UpdateIncidentTypeHandler
  implements ICommandHandler<UpdateIncidentTypeCommand>
{
  private readonly _logger = new Logger(UpdateIncidentTypeHandler.name);

  constructor(
    @InjectRepository(IncidentTypeEntity)
    private readonly _incidentTypeRepository: Repository<IncidentTypeEntity>,
  ) {}

  async execute(command: UpdateIncidentTypeCommand): Promise<void> {
    this._logger.log('Init command handler');
    const { updateIncidentTypeDto, incidentTypeCode } = command;

    const incidentType = await this._incidentTypeRepository.findOneBy({
      incidentTypeCode,
    });

    if (!incidentType) {
      throw BusinessErrors.NotFoundIncidentType;
    }

    Object.assign(incidentType, updateIncidentTypeDto);
    await this._incidentTypeRepository.save(incidentType);
  }
}
