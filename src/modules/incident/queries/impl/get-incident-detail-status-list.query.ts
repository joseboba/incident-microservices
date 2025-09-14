import { ICommand } from '@nestjs/cqrs';

export class GetIncidentDetailStatusListQuery implements ICommand {
  constructor() {}
}
