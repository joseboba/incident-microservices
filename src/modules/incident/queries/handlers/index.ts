import { FindIncidentTypeByCodeHandler } from './find-incident-type-by-code.handler';
import { GetIncidentTypeListHandler } from './get-incident-type-list.handler';
import { GetIncidentPriorityLevelListHandler } from './get-incident-priority-level-list.handler';
import { FindIncidentPriorityLevelByCodeHandler } from './find-incident-priority-level-by-code.handler';
import { GetIncidentDetailStatusListHandler } from './get-incident-detail-status-list.handler';
import { GetIncidentListHandler } from './get-incident-list.handler';
import { GetIncidentByIdHandler } from './get-incident-by-id.handler';

export const QueryHandlers = [
  FindIncidentPriorityLevelByCodeHandler,
  FindIncidentTypeByCodeHandler,
  GetIncidentByIdHandler,
  GetIncidentDetailStatusListHandler,
  GetIncidentListHandler,
  GetIncidentPriorityLevelListHandler,
  GetIncidentTypeListHandler,
];
