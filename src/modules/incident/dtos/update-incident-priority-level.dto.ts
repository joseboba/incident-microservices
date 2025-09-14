import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IncidentPriorityLevelDto } from './incident-priority-level.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateIncidentPriorityLevelDto extends PartialType(
  OmitType(IncidentPriorityLevelDto, ['incidentPriorityLevelCode' as const]),
) {
  @IsBoolean()
  @Type(() => Boolean)
  @IsNotEmpty()
  @ApiProperty()
  isActive: boolean;
}
