import { IQuery } from '@nestjs/cqrs';

export class GetIncidentByIdQuery implements IQuery {
  constructor(public readonly incidentId: number) {}
}
