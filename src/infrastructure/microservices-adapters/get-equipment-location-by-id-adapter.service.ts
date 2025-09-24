import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';
import { AdapterErrorValidation, Response } from 'incident-management-commons';
import { GetEquipmentLocationByIdDto } from './dtos/get-equipment-location-by-id.dto';

@Injectable()
export class GetEquipmentLocationByIdAdapterService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _httpService: HttpService,
  ) {}

  async execute(
    equipmentLocationId: number,
  ): Promise<GetEquipmentLocationByIdDto> {
    const url = this.buildReqUrl(equipmentLocationId);

    return firstValueFrom(
      this._httpService.get<Response<GetEquipmentLocationByIdDto>>(url).pipe(
        map((res) => res.data.data),
        catchError((error: AxiosError) => {
          throw new AdapterErrorValidation().execute(error);
        }),
      ),
    );
  }

  private buildReqUrl(equipmentLocationId: number) {
    const { baseUrl, resourcePath } = this._configService.get(
      'equipmentLocation.getEquipmentLocationById',
    );

    return `${baseUrl}/${resourcePath}`.replace(
      ':id',
      `${equipmentLocationId}`,
    );
  }
}
