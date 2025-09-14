import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from 'incident-management-commons';
import { IncidentEntity } from './incident.entity';

@Entity({ name: 'incident_priority_level' })
export class IncidentPriorityLevelEntity extends BaseEntity {
  @PrimaryColumn({
    name: 'incident_priority_level_code',
    type: 'varchar',
    length: 10,
  })
  incidentPriorityLevelCode: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 25,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 50,
  })
  description: string;

  @OneToMany(() => IncidentEntity, (e) => e.incidentPriorityLevel)
  incidents: IncidentEntity[];
}
