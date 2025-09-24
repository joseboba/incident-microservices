import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetIncidentListQueryDto {
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  endDate: Date;

  @IsOptional()
  @IsBooleanString()
  @ApiProperty({ required: false })
  isCompleted?: boolean;

  @IsOptional()
  @IsBooleanString()
  @ApiProperty({ required: false })
  isInProgress?: boolean;
}
