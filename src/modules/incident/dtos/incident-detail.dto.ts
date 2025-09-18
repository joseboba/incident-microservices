import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, nullable: true })
  technicianUserAppId: number;
}
