import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetIncidentTypeListQuery } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentTypeEntity } from '@entities';
import { Repository } from 'typeorm';

@QueryHandler(GetIncidentTypeListQuery)
export class GetIncidentTypeListHandler
  implements IQueryHandler<GetIncidentTypeListQuery>
{
  private readonly _logger = new Logger(GetIncidentTypeListHandler.name);

  constructor(
    @InjectRepository(IncidentTypeEntity)
    private readonly _incidentTypeRepository: Repository<IncidentTypeEntity>,
  ) {}

  async execute(): Promise<IncidentTypeEntity[]> {
    this._logger.log('Init query handler');

    return this._incidentTypeRepository.find();
  }
}
