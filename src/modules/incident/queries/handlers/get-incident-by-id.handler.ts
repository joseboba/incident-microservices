import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetIncidentByIdQuery } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@QueryHandler(GetIncidentByIdQuery)
export class GetIncidentByIdHandler
  implements IQueryHandler<GetIncidentByIdQuery>
{
  private readonly _logger = new Logger(GetIncidentByIdHandler.name);

  constructor(
    @InjectRepository(IncidentEntity)
    private readonly _incidentRepository: Repository<IncidentEntity>,
  ) {}

  async execute(query: GetIncidentByIdQuery): Promise<IncidentEntity> {
    this._logger.log('Init query handler');
    const { incidentId } = query;

    const incident = await this._incidentRepository.findOne({
      where: { incidentId },
      relations: {
        incidentDetails: {
          incidentDetailStatus: true,
        },
        incidentType: true,
        incidentPriorityLevel: true,
      },
    });

    if (!incident) {
      throw BusinessErrors.IncidentDoesNotExist;
    }

    return incident;
  }
}
