import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AssignTechnicalUserDto,
  GetIncidentListQueryDto,
  IncidentDto,
  IncidentPriorityLevelDto,
  IncidentTypeDto,
  UpdateIncidentPriorityLevelDto,
  UpdateIncidentTypeDto,
} from '@dtos';
import {
  IncidentDetailStatusEntity,
  IncidentEntity,
  IncidentPriorityLevelEntity,
  IncidentTypeEntity,
} from '@entities';
import {
  AssignTechnicalUserCommand,
  DeleteIncidentPriorityLevelCommand,
  DeleteIncidentTypeCommand,
  RegisterIncidentCommand,
  RegisterIncidentPriorityLevelCommand,
  RegisterIncidentTypeCommand,
  UpdateIncidentDetailStatusCommand,
  UpdateIncidentPriorityLevelCommand,
  UpdateIncidentTypeCommand,
} from '../commands/impl';
import {
  FindIncidentPriorityLevelByCodeQuery,
  FindIncidentTypeByCodeQuery, GetIncidentByIdQuery,
  GetIncidentDetailStatusListQuery,
  GetIncidentListQuery,
  GetIncidentPriorityLevelListQuery,
  GetIncidentTypeListQuery,
} from '../queries/impl';
import { BaseJwtPayload, GetUser, Public } from 'incident-management-commons';
import { IncidentDetailStatusEnum } from '@enums';
import { GetIncidentByIdHandler } from '../queries/handlers/get-incident-by-id.handler';

@Controller()
export class IncidentController {
  constructor(
    private readonly _command: CommandBus,
    private readonly _query: QueryBus,
  ) {}

  @Get()
  async listIncident(
    @Query() getIncidentListQueryDto: GetIncidentListQueryDto,
    @GetUser() user: BaseJwtPayload,
  ): Promise<IncidentEntity[]> {
    return this._query.execute(
      new GetIncidentListQuery(
        user,
        getIncidentListQueryDto.startDate,
        getIncidentListQueryDto.endDate,
        getIncidentListQueryDto.isCompleted,
        getIncidentListQueryDto.isInProgress,
      ),
    );
  }

  @Get(':incidentId')
  async getIncidentById(
    @Param('incidentId', ParseIntPipe) incidentId: number,
  ): Promise<IncidentEntity[]> {
    return this._query.execute(new GetIncidentByIdQuery(incidentId));
  }

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

  @Patch('assign-technical/:incidentDetailId')
  async detailAssignTechnical(
    @Param('incidentDetailId', ParseIntPipe) incidentDetailId: number,
    @Body() assignTechnicalUserDto: AssignTechnicalUserDto,
    @GetUser() user: BaseJwtPayload,
  ): Promise<void> {
    return this._command.execute(
      new AssignTechnicalUserCommand(
        user,
        incidentDetailId,
        assignTechnicalUserDto,
      ),
    );
  }

  @Patch('detail/to-revision/:incidentDetailId')
  async updateToInRevisionIncidentDetail(
    @Param('incidentDetailId', ParseIntPipe) incidentDetailId: number,
    @GetUser() user: BaseJwtPayload,
  ): Promise<void> {
    return this._command.execute(
      new UpdateIncidentDetailStatusCommand(
        user,
        incidentDetailId,
        IncidentDetailStatusEnum.ASG,
        IncidentDetailStatusEnum.REV,
      ),
    );
  }

  @Patch('detail/to-fix/:incidentDetailId')
  async updateToFixIncidentDetail(
    @Param('incidentDetailId', ParseIntPipe) incidentDetailId: number,
    @GetUser() user: BaseJwtPayload,
  ): Promise<void> {
    return this._command.execute(
      new UpdateIncidentDetailStatusCommand(
        user,
        incidentDetailId,
        IncidentDetailStatusEnum.REV,
        IncidentDetailStatusEnum.REP,
      ),
    );
  }

  @Patch('detail/to-fixed/:incidentDetailId')
  async updateToFixedIncidentDetail(
    @Param('incidentDetailId', ParseIntPipe) incidentDetailId: number,
    @GetUser() user: BaseJwtPayload,
  ): Promise<void> {
    return this._command.execute(
      new UpdateIncidentDetailStatusCommand(
        user,
        incidentDetailId,
        IncidentDetailStatusEnum.REP,
        IncidentDetailStatusEnum.REPA,
      ),
    );
  }

  @Patch('detail/to-finished/:incidentDetailId')
  async updateToFinishedIncidentDetail(
    @Param('incidentDetailId', ParseIntPipe) incidentDetailId: number,
    @GetUser() user: BaseJwtPayload,
  ): Promise<void> {
    return this._command.execute(
      new UpdateIncidentDetailStatusCommand(
        user,
        incidentDetailId,
        IncidentDetailStatusEnum.REPA,
        IncidentDetailStatusEnum.FIN,
      ),
    );
  }
}
