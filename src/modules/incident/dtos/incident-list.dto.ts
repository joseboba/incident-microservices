import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional } from 'class-validator';
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
  @Type(() => Boolean)
  @IsBoolean()
  @ApiProperty({ required: false })
  isCompleted?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @ApiProperty({ required: false })
  isInProgress?: boolean;
}