import { IQuery } from '@nestjs/cqrs';
import { BaseJwtPayload } from 'incident-management-commons';

export class GetIncidentListQuery implements IQuery {
  constructor(
    public readonly user: BaseJwtPayload,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly isCompleted?: boolean,
    public readonly isInProgress?: boolean,
  ) {}
}
