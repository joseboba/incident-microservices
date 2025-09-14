import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { IncidentController } from './controller/incident.controller';
import {
  IncidentDetailEntity,
  IncidentDetailStatusEntity,
  IncidentEntity,
  IncidentPriorityLevelEntity,
  IncidentStatusHistoryEntity,
  IncidentTypeEntity,
} from '@entities';
import { QueryHandlers } from './queries/handlers';
import { MicroservicesAdapters } from '../../infrastructure/microservices-adapters';

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    TypeOrmModule.forFeature([
      IncidentEntity,
      IncidentDetailEntity,
      IncidentDetailStatusEntity,
      IncidentPriorityLevelEntity,
      IncidentStatusHistoryEntity,
      IncidentTypeEntity,
    ]),
  ],
  controllers: [IncidentController],
  providers: [...CommandHandlers, ...QueryHandlers, ...MicroservicesAdapters],
})
export class IncidentModule {}
