import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IncidentTypeDto } from './incident-type.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateIncidentTypeDto extends PartialType(
  OmitType(IncidentTypeDto, ['incidentTypeCode' as const]),
) {
  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  @ApiProperty()
  isActive: boolean;
}
