import { ICommand } from '@nestjs/cqrs';
import { IncidentDetailStatusEnum } from '@enums';
import { BaseJwtPayload } from 'incident-management-commons';

export class UpdateIncidentDetailStatusCommand implements ICommand {
  constructor(
    public readonly user: BaseJwtPayload,
    public readonly incidentDetailId: number,
    public readonly prevIncidentDetailStatus: IncidentDetailStatusEnum,
    public readonly nextIncidentDetailStatus: IncidentDetailStatusEnum,
  ) {}
}
