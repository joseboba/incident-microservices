import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterIncidentTypeCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentTypeEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(RegisterIncidentTypeCommand)
export class RegisterIncidentTypeHandler
  implements ICommandHandler<RegisterIncidentTypeCommand>
{
  private readonly _logger = new Logger(RegisterIncidentTypeHandler.name);

  constructor(
    @InjectRepository(IncidentTypeEntity)
    private readonly _incidentTypeRepository: Repository<IncidentTypeEntity>,
  ) {}

  async execute(
    command: RegisterIncidentTypeCommand,
  ): Promise<IncidentTypeEntity> {
    this._logger.log('Init command handler');
    const { registerIncidentTypeDto } = command;

    const incidentType = await this._incidentTypeRepository.findOneBy({
      incidentTypeCode: registerIncidentTypeDto.incidentTypeCode,
    });

    if (incidentType) {
      throw BusinessErrors.IncidentTypeCodeAlreadyExist;
    }

    const entity = new IncidentTypeEntity();
    Object.assign(entity, registerIncidentTypeDto);

    return await this._incidentTypeRepository.save(entity);
  }
}
