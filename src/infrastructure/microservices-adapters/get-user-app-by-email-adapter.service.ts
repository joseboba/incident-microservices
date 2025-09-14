import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { GetUserAppByUserAppIdResponse } from './dtos';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';
import { AdapterErrorValidation, Response } from 'incident-management-commons';

@Injectable()
export class GetUserAppByEmailAdapter {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _httpService: HttpService,
  ) {}

  async execute(email: string): Promise<GetUserAppByUserAppIdResponse> {
    const url = this.buildReqUrl(email);

    return firstValueFrom(
      this._httpService.get<Response<GetUserAppByUserAppIdResponse>>(url).pipe(
        map((res) => res.data.data),
        catchError((error: AxiosError) => {
          throw new AdapterErrorValidation().execute(error);
        }),
      ),
    );
  }

  private buildReqUrl(email: string) {
    const { baseUrl, resourcePath } = this._configService.get(
      'user.getUserAppByUserAppId',
    );

    return `${baseUrl}/${resourcePath}`.replace(':email', `${email}`);
  }
}
