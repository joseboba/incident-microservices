import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetIncidentListQuery } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentEntity } from '@entities';
import { Between, Repository } from 'typeorm';
import { GetUserAppByEmailAdapter } from '../../../../infrastructure/microservices-adapters';

@QueryHandler(GetIncidentListQuery)
export class GetIncidentListHandler
  implements IQueryHandler<GetIncidentListQuery>
{
  private readonly _logger = new Logger(GetIncidentListHandler.name);

  constructor(
    @InjectRepository(IncidentEntity)
    private readonly _incidentRepository: Repository<IncidentEntity>,
    private readonly _getUserAppByUserAppIdAdapter: GetUserAppByEmailAdapter,
  ) {}

  async execute(query: GetIncidentListQuery): Promise<IncidentEntity[]> {
    this._logger.log('Init query handler');

    const { startDate, endDate, isCompleted, isInProgress, user } = query;

    const cleanStartDate = this.cleanValue(startDate, true);
    const cleanEndDate = this.cleanValue(endDate, false);

    const isBasicUser = !user.isAdmin && !user.isTechnical;
    const userApp = await this._getUserAppByUserAppIdAdapter.execute(
      user.email,
    );

    return await this._incidentRepository.find({
      where: {
        reportedDate: Between(cleanStartDate, cleanEndDate),
        isCompleted: isCompleted,
        inProgress: isInProgress,
        reportUserAppId: isBasicUser ? userApp.userAppId : undefined,
        incidentDetails: {
          technicianUserAppId: user.isTechnical ? userApp.userAppId : undefined,
        },
      },
      relations: {
        incidentPriorityLevel: true,
      }
    });
  }

  private cleanValue(originalDate: Date, isStart: boolean): Date {
    const date = new Date(originalDate);
    if (isStart) {
      date.setHours(0, 0, 0, 0);
      return date;
    }

    date.setHours(23, 59, 59, 999);
    return date;
  }
}
