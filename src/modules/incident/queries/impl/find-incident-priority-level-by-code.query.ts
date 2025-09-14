import { IQuery } from '@nestjs/cqrs';

export class FindIncidentPriorityLevelByCodeQuery implements IQuery {
  constructor(public readonly incidentPriorityLevelCode: string) {}
}
