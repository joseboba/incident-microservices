import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength, ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IncidentDetailDto } from '@dtos';
import { Type } from 'class-transformer';

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

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => IncidentDetailDto)
  @ApiProperty({
    type: IncidentDetailDto,
    isArray: true,
    example: [
      {
        description: 'test',
        equipmentId: 123,
        equipmentLocationId: 45,
      },
    ],
  })
  details: IncidentDetailDto[];
}
