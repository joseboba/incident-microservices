import { IQuery } from '@nestjs/cqrs';

export class FindIncidentTypeByCodeQuery implements IQuery {
  constructor(public readonly incidentTypeCode: string) {}
}
