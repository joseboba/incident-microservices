import { ICommand } from '@nestjs/cqrs';
import { IncidentTypeDto } from '@dtos';

export class RegisterIncidentTypeCommand implements ICommand {
  constructor(public readonly registerIncidentTypeDto: IncidentTypeDto) {}
}
