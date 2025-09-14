import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IncidentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty()
  incidentTypeCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty()
  incidentPriorityLevelCode: string;
}
