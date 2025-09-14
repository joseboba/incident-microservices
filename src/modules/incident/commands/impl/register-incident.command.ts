import { ICommand } from '@nestjs/cqrs';
import { IncidentDto } from '@dtos';

export class RegisterIncidentCommand implements ICommand {
  constructor(
    public readonly registerIncidentDto: IncidentDto,
    public readonly email: string,
  ) {}
}
