import { ICommand } from '@nestjs/cqrs';

export class DeleteIncidentTypeCommand implements ICommand {
  constructor(public readonly incidentTypeCode: string) {}
}
