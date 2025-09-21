import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class IncidentDetailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty()
  equipmentId: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty()
  equipmentLocationId: number;
}
