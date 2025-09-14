import { RegisterIncidentTypeHandler } from './register-incident-type.handler';
import { UpdateIncidentTypeHandler } from './update-incident-type.handler';
import { DeleteIncidentTypeHandler } from './delete-incident-type.handler';
import { DeleteIncidentPriorityLevelHandler } from './delete-incident-priority-level.handler';
import { UpdateIncidentPriorityLevelHandler } from './update-incident-priority-level.handler';
import { RegisterIncidentPriorityLevelHandler } from './register-incident-priority-level.handler';
import { RegisterIncidentHandler } from './register-incident.handler';

export const CommandHandlers = [
  DeleteIncidentPriorityLevelHandler,
  DeleteIncidentTypeHandler,
  RegisterIncidentHandler,
  RegisterIncidentTypeHandler,
  RegisterIncidentPriorityLevelHandler,
  UpdateIncidentPriorityLevelHandler,
  UpdateIncidentTypeHandler,
];
