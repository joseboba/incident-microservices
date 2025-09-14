import { ICommand } from '@nestjs/cqrs';
import { UpdateIncidentPriorityLevelDto } from '@dtos';

export class UpdateIncidentPriorityLevelCommand implements ICommand {
  constructor(
    public readonly updateIncidentPriorityLevelDto: UpdateIncidentPriorityLevelDto,
    public readonly incidentPriorityLevelCode: string,
  ) {}
}
