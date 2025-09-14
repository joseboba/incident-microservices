import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from 'incident-management-commons';
import { IncidentEntity } from './incident.entity';

@Entity({ name: 'incident_type' })
export class IncidentTypeEntity extends BaseEntity {
  @PrimaryColumn({
    name: 'incident_type_code',
    type: 'varchar',
    length: 10,
  })
  incidentTypeCode: string;

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

  @OneToMany(() => IncidentEntity, (e) => e.incidentType)
  incidents: IncidentEntity[];
}
