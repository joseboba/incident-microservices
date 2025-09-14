import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindIncidentPriorityLevelByCodeQuery } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentPriorityLevelEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@QueryHandler(FindIncidentPriorityLevelByCodeQuery)
export class FindIncidentPriorityLevelByCodeHandler
  implements IQueryHandler<FindIncidentPriorityLevelByCodeQuery>
{
  private readonly _logger = new Logger(
    FindIncidentPriorityLevelByCodeHandler.name,
  );

  constructor(
    @InjectRepository(IncidentPriorityLevelEntity)
    private readonly _incidentPriorityLevelRepository: Repository<IncidentPriorityLevelEntity>,
  ) {}

  async execute(
    query: FindIncidentPriorityLevelByCodeQuery,
  ): Promise<IncidentPriorityLevelEntity> {
    this._logger.log('Init query handler');
    const { incidentPriorityLevelCode } = query;

    const incidentDetailStatus =
      await this._incidentPriorityLevelRepository.findOneBy({
        incidentPriorityLevelCode,
      });

    if (!incidentDetailStatus) {
      throw BusinessErrors.NotFoundIncidentPriorityLevel;
    }

    return incidentDetailStatus;
  }
}
