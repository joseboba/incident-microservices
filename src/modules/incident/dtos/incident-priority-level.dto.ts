import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IncidentDescriptionDto } from './incident-description.dto';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class IncidentPriorityLevelDto extends PartialType(
  IncidentDescriptionDto,
) {
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  @ApiProperty()
  incidentPriorityLevelCode: string;
}
