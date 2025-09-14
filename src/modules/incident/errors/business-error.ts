import { BusinessError } from 'incident-management-commons';

export class BusinessErrors {
  public static readonly IncidentTypeCodeAlreadyExist = new BusinessError(
    'INCIDENT.IncidentTypeCodeAlreadyExist',
    'Incident type code already exist',
  );

  public static readonly NotFoundIncidentType = new BusinessError(
    'INCIDENT.NotFoundIncidentType',
    'Incident type not found',
  );

  public static readonly IncidentTypeIsNotActive = new BusinessError(
    'INCIDENT.IncidentTypeIsNotActive',
    'Incident type is not active',
  );

  public static readonly IncidentPriorityLevelCodeAlreadyExist =
    new BusinessError(
      'INCIDENT.IncidentPriorityLevelCodeAlreadyExist',
      'Incident priority level code already exist',
    );

  public static readonly NotFoundIncidentPriorityLevel = new BusinessError(
    'INCIDENT.NotFoundIncidentPriorityLevel',
    'Incident priority level not found',
  );

  public static readonly IncidentPriorityLevelIsNotActive = new BusinessError(
    'INCIDENT.IncidentPriorityLevelIsNotActive',
    'Incident priority level is not active',
  );

  public static readonly IncidentUserAppIsNotActive = new BusinessError(
    'INCIDENT.IncidentUserAppIsNotActive',
    'User app is not active',
  );
}
