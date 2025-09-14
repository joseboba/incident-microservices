import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  IncidentDto,
  IncidentPriorityLevelDto,
  IncidentTypeDto,
  UpdateIncidentPriorityLevelDto,
  UpdateIncidentTypeDto,
} from '@dtos';
import { IncidentDetailStatusEntity, IncidentEntity, IncidentPriorityLevelEntity, IncidentTypeEntity } from '@entities';
import {
  DeleteIncidentPriorityLevelCommand,
  DeleteIncidentTypeCommand, RegisterIncidentCommand,
  RegisterIncidentPriorityLevelCommand,
  RegisterIncidentTypeCommand,
  UpdateIncidentPriorityLevelCommand,
  UpdateIncidentTypeCommand,
} from '../commands/impl';
import {
  FindIncidentPriorityLevelByCodeQuery,
  FindIncidentTypeByCodeQuery, GetIncidentDetailStatusListQuery,
  GetIncidentPriorityLevelListQuery,
  GetIncidentTypeListQuery,
} from '../queries/impl';
import { BaseJwtPayload, GetUser } from 'incident-management-commons';

@Controller()
export class IncidentController {
  constructor(
    private readonly _command: CommandBus,
    private readonly _query: QueryBus,
  ) {}

  @Get('type/:typeCode')
  async findIncidentTypeByCode(
    @Param('typeCode') typeCode: string,
  ): Promise<IncidentTypeEntity> {
    return this._query.execute(new FindIncidentTypeByCodeQuery(typeCode));
  }

  @Get('type-list')
  async getIncidentTypeList(): Promise<IncidentTypeEntity[]> {
    return this._query.execute(new GetIncidentTypeListQuery());
  }

  @Get('detail-status-list')
  async getDetailStatusList(): Promise<IncidentDetailStatusEntity[]> {
    return this._query.execute(new GetIncidentDetailStatusListQuery());
  }

  @Get('priority-level/:priorityLevelCode')
  async findIncidentDetailStatusByCode(
    @Param('priorityLevelCode') priorityLevelCode: string,
  ): Promise<IncidentPriorityLevelEntity> {
    return this._query.execute(
      new FindIncidentPriorityLevelByCodeQuery(priorityLevelCode),
    );
  }

  @Get('priority-level-list')
  async getIncidentDetailStatusList(): Promise<IncidentPriorityLevelEntity[]> {
    return this._query.execute(new GetIncidentPriorityLevelListQuery());
  }

  @Post()
  async registerIncident(
    @Body() registerIncidentDto: IncidentDto,
    @GetUser() user: BaseJwtPayload,
  ): Promise<IncidentEntity> {
    return this._command.execute(
      new RegisterIncidentCommand(registerIncidentDto, user.email),
    );
  }

  @Post('type')
  async registerIncidentType(
    @Body() registerIncidentTypeDto: IncidentTypeDto,
  ): Promise<IncidentTypeEntity> {
    return this._command.execute(
      new RegisterIncidentTypeCommand(registerIncidentTypeDto),
    );
  }

  @Post('priority-level')
  async registerIncidentDetailStatus(
    @Body() registerIncidentDetailStatus: IncidentPriorityLevelDto,
  ): Promise<IncidentPriorityLevelEntity> {
    return this._command.execute(
      new RegisterIncidentPriorityLevelCommand(registerIncidentDetailStatus),
    );
  }

  @Put('type/:typeCode')
  async updateIncidentType(
    @Param('typeCode') typeCode: string,
    @Body() updateIncidentTypeDto: UpdateIncidentTypeDto,
  ): Promise<void> {
    return this._command.execute(
      new UpdateIncidentTypeCommand(updateIncidentTypeDto, typeCode),
    );
  }

  @Put('priority-level/:priorityLevelCode')
  async updateIncidentDetailStatus(
    @Param('priorityLevelCode') priorityLevelCode: string,
    @Body() updateIncidentDetailStatusDto: UpdateIncidentPriorityLevelDto,
  ): Promise<void> {
    return this._command.execute(
      new UpdateIncidentPriorityLevelCommand(
        updateIncidentDetailStatusDto,
        priorityLevelCode,
      ),
    );
  }

  @Delete('type/:typeCode')
  async deleteIncidentType(@Param('typeCode') typeCode: string): Promise<void> {
    return this._command.execute(new DeleteIncidentTypeCommand(typeCode));
  }

  @Delete('priority-level/:priorityLevelCode')
  async deleteIncidentDetailStatus(
    @Param('priorityLevelCode') priorityLevelCode: string,
  ): Promise<void> {
    return this._command.execute(
      new DeleteIncidentPriorityLevelCommand(priorityLevelCode),
    );
  }
}
