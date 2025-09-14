import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IncidentDetailEntity, IncidentDetailStatusEntity, IncidentPriorityLevelEntity } from '@entities';

@Entity({ name: 'incident_status_history' })
export class IncidentStatusHistoryEntity {

  @PrimaryColumn({ name: 'incident_detail_status_code' })
  incidentDetailStatusCode: string;

  @ManyToOne(() => IncidentDetailStatusEntity, (e) => e.incidentStatusHistories)
  @JoinColumn({ name: 'incident_detail_status_code' })
  incidentDetailStatus: IncidentDetailStatusEntity;

  @PrimaryColumn({ name: 'incident_detail_id' })
  incidentDetailId: number;

  @ManyToOne(() => IncidentDetailEntity, (e) => e.incidentStatusHistories)
  @JoinColumn({ name: 'incident_detail_id' })
  incidentDetail: IncidentDetailEntity;

  @Column({ name: 'incident_status_date' })
  incidentStatusDate: Date;

  @Column({ name: 'updated_by_user_app_id' })
  updatedByUserAppId: number;

}