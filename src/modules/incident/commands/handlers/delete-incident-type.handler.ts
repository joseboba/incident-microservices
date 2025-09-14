import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteIncidentTypeCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentTypeEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(DeleteIncidentTypeCommand)
export class DeleteIncidentTypeHandler
  implements ICommandHandler<DeleteIncidentTypeCommand>
{
  constructor(
    @InjectRepository(IncidentTypeEntity)
    private readonly _incidentTypeRepository: Repository<IncidentTypeEntity>,
  ) {}

  async execute(command: DeleteIncidentTypeCommand) {
    const { incidentTypeCode } = command;

    const incidentType = await this._incidentTypeRepository.findOneBy({
      incidentTypeCode,
    });

    if (!incidentType) {
      throw BusinessErrors.NotFoundIncidentType;
    }

    await this._incidentTypeRepository.remove(incidentType);
  }
}
