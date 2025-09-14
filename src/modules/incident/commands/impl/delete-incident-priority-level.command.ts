import { ICommand } from '@nestjs/cqrs';

export class DeleteIncidentPriorityLevelCommand implements ICommand {
  constructor(public readonly incidentPriorityLevelCode: string) {}
}
