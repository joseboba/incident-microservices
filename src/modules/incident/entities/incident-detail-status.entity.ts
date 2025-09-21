import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IncidentDetailEntity, IncidentStatusHistoryEntity } from '@entities';

@Entity({ name: 'incident_detail_status' })
export class IncidentDetailStatusEntity {
  @PrimaryColumn({
    name: 'incident_detail_status_code',
    type: 'varchar',
    length: 10,
  })
  incidentDetailStatusCode: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 50,
  })
  description: string;

  @OneToMany(() => IncidentDetailEntity, (e) => e.incidentDetailStatus)
  incidentDetail: IncidentDetailEntity[];

  @OneToMany(() => IncidentStatusHistoryEntity, (e) => e.incidentDetailStatus)
  incidentStatusHistories: IncidentStatusHistoryEntity[];
}
