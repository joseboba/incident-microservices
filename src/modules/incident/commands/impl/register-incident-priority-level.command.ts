import { ICommand } from '@nestjs/cqrs';
import { IncidentPriorityLevelDto } from '@dtos';

export class RegisterIncidentPriorityLevelCommand implements ICommand {
  constructor(
    public readonly incidentPriorityLevelDto: IncidentPriorityLevelDto,
  ) {}
}
