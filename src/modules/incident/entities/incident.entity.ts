import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { IncidentTypeEntity } from './incident-type.entity';
import { IncidentPriorityLevelEntity } from './incident-priority-level.entity';
import { IncidentDetailEntity } from './incident-detail.entity';

@Entity({ name: 'incident' })
export class IncidentEntity {
  @PrimaryColumn({
    name: 'incident_id',
    type: 'int',
    default: () => "nextval('e_incident.incident_id')",
  })
  incidentId: number;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @ManyToOne(() => IncidentTypeEntity, (e) => e.incidents)
  @JoinColumn({ name: 'incident_type_code' })
  incidentType: IncidentTypeEntity;

  @ManyToOne(() => IncidentPriorityLevelEntity, (e) => e.incidents)
  @JoinColumn({ name: 'incident_priority_level_code' })
  incidentPriorityLevel: IncidentPriorityLevelEntity;

  @Column({
    name: 'report_user_app_id',
    type: 'int',
  })
  reportUserAppId: number;

  @Column({
    name: 'reported_date',
    type: 'timestamp',
  })
  reportedDate: Date;

  @Column({
    name: 'is_completed',
    type: 'boolean',
  })
  isCompleted: boolean;

  @Column({
    name: 'in_progress',
    type: 'boolean',
  })
  inProgress: boolean;

  @Column({
    name: 'completed_date',
    type: 'timestamp',
  })
  completedDate: Date;

  @OneToMany(() => IncidentDetailEntity, (e) => e.incident)
  incidentDetails: IncidentDetailEntity[];
}
