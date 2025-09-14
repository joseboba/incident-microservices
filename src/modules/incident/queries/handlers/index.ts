import { FindIncidentTypeByCodeHandler } from './find-incident-type-by-code.handler';
import { GetIncidentTypeListHandler } from './get-incident-type-list.handler';
import { GetIncidentPriorityLevelListHandler } from './get-incident-priority-level-list.handler';
import { FindIncidentPriorityLevelByCodeHandler } from './find-incident-priority-level-by-code.handler';
import { GetIncidentDetailStatusListHandler } from './get-incident-detail-status-list.handler';

export const QueryHandlers = [
  FindIncidentPriorityLevelByCodeHandler,
  FindIncidentTypeByCodeHandler,
  GetIncidentDetailStatusListHandler,
  GetIncidentPriorityLevelListHandler,
  GetIncidentTypeListHandler,
];
