import { ICommand } from '@nestjs/cqrs';
import { UpdateIncidentTypeDto } from '@dtos';

export class UpdateIncidentTypeCommand implements ICommand {
  constructor(
    public readonly updateIncidentTypeDto: UpdateIncidentTypeDto,
    public readonly incidentTypeCode: string,
  ) {}
}
