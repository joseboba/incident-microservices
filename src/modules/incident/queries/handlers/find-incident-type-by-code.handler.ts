import { FindIncidentTypeByCodeQuery } from '../impl';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentTypeEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@QueryHandler(FindIncidentTypeByCodeQuery)
export class FindIncidentTypeByCodeHandler
  implements IQueryHandler<FindIncidentTypeByCodeQuery>
{
  private readonly _logger = new Logger(FindIncidentTypeByCodeHandler.name);

  constructor(
    @InjectRepository(IncidentTypeEntity)
    private readonly _incidentTypeRepository: Repository<IncidentTypeEntity>,
  ) {}

  async execute(
    query: FindIncidentTypeByCodeQuery,
  ): Promise<IncidentTypeEntity> {
    this._logger.log('Init query handler');
    const { incidentTypeCode } = query;

    const incidentType = await this._incidentTypeRepository.findOneBy({
      incidentTypeCode,
    });

    if (!incidentType) {
      throw BusinessErrors.NotFoundIncidentType;
    }

    return incidentType;
  }
}
