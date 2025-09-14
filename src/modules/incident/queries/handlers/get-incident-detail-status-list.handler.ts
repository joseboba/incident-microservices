import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetIncidentDetailStatusListQuery } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentDetailStatusEntity } from '@entities';
import { Repository } from 'typeorm';

@QueryHandler(GetIncidentDetailStatusListQuery)
export class GetIncidentDetailStatusListHandler
  implements IQueryHandler<GetIncidentDetailStatusListQuery>
{
  private readonly _logger = new Logger(
    GetIncidentDetailStatusListHandler.name,
  );

  constructor(
    @InjectRepository(IncidentDetailStatusEntity)
    private readonly _incidentDetailStatusRepository: Repository<IncidentDetailStatusEntity>,
  ) {}

  async execute(): Promise<IncidentDetailStatusEntity[]> {
    this._logger.log('Init query handler');
    return this._incidentDetailStatusRepository.find();
  }
}
