import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { IncidentDetailStatusEntity } from './incident-detail-status.entity';
import { IncidentEntity } from './incident.entity';
import { IncidentStatusHistoryEntity } from './incident-status-history.entity';

@Entity({ name: 'incident_detail' })
export class IncidentDetailEntity {
  @PrimaryColumn({
    name: 'incident_detail_id',
    type: 'int',
    default: () => "nextval('e_incident.seq_incident_detail')",
  })
  incidentDetailId: number;

  @Column({
    name: 'description',
    type: 'text',
  })
  description: string;

  @ManyToOne(() => IncidentEntity, (e) => e.incidentDetails)
  @JoinColumn({ name: 'incident_id' })
  incident: IncidentEntity;

  @Column({
    name: 'equipment_id',
    type: 'int',
  })
  equipmentId: number;

  @Column({
    name: 'equipment_location_id',
    type: 'int',
  })
  equipmentLocationId: number;

  @Column({
    name: 'technician_user_app_id',
    type: 'int',
  })
  technicianUserAppId: number;

  @ManyToOne(() => IncidentDetailStatusEntity, (e) => e.incidentDetail)
  @JoinColumn({ name: 'incident_detail_status_code' })
  incidentDetailStatus: IncidentDetailStatusEntity;

  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @OneToMany(() => IncidentStatusHistoryEntity, (e) => e.incidentDetail)
  incidentStatusHistories: IncidentStatusHistoryEntity[];

  @BeforeInsert()
  setBothDates() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  setUpdateAt() {
    this.updatedAt = new Date();
  }
}
