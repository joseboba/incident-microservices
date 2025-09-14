import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentPriorityLevelEntity } from '@entities';
import { Repository } from 'typeorm';
import { GetIncidentPriorityLevelListQuery } from '../impl';

@QueryHandler(GetIncidentPriorityLevelListQuery)
export class GetIncidentPriorityLevelListHandler
  implements IQueryHandler<GetIncidentPriorityLevelListQuery>
{
  private readonly _logger = new Logger(
    GetIncidentPriorityLevelListHandler.name,
  );

  constructor(
    @InjectRepository(IncidentPriorityLevelEntity)
    private readonly _incidentPriorityLevelRepository: Repository<IncidentPriorityLevelEntity>,
  ) {}

  async execute(): Promise<IncidentPriorityLevelEntity[]> {
    this._logger.log('Init query handler');
    return this._incidentPriorityLevelRepository.find();
  }
}
