import { ICommand } from '@nestjs/cqrs';
import { AssignTechnicalUserDto } from '@dtos';
import { BaseJwtPayload } from 'incident-management-commons';

export class AssignTechnicalUserCommand implements ICommand {
  constructor(
    public readonly user: BaseJwtPayload,
    public readonly incidentDetailId: number,
    public readonly assignTechnicalUser: AssignTechnicalUserDto
  ) {}
}
