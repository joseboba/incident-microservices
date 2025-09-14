import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IncidentDescriptionDto } from './';

export class IncidentTypeDto extends PartialType(IncidentDescriptionDto) {

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty()
  incidentTypeCode: string;

}