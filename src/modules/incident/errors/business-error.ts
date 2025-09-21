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

  public static readonly TechnicalUserIsInactive = new BusinessError(
    'INCIDENT.TechnicalUserIsInactive',
    'Technical user is inactive',
  );

  public static readonly UserIsNotATechnicalUser = new BusinessError(
    'INCIDENT.UserIsNotATechnicalUser',
    'User is not a technical user',
  );

  public static readonly IncidentDetailNotExist = new BusinessError(
    'INCIDENT.IncidentDetailNotExist',
    'Incident detail not exist',
  );

  public static readonly IncidentDetailStatusIsNotValid = new BusinessError(
    'INCIDENT.IncidentDetailStatusIsNotValid',
    'Incident detail status is not valid',
  );

  public static readonly IncidentDoesNotExist = new BusinessError(
    'INCIDENT.IncidentDoesNotExist',
    'Incident does not exist',
  );

  public static readonly IncidentIsAlreadyCompleted = new BusinessError(
    'INCIDENT.IncidentIsAlreadyCompleted',
    'Incident is already completed',
  );

  public static readonly UserIsNotAdministrator = new BusinessError(
    'INCIDENT.UserIsNotAdministrator',
    'User is not administrator',
  );

  public static readonly UserIsNotTechnician = new BusinessError(
    'INCIDENT.UserIsNotTechnician',
    'User is not technician',
  );


  public static readonly IncidentDetailIsNotInCorrectStatus = new BusinessError(
    'INCIDENT.IncidentDetailIsNotInCorrectStatus',
    'Incident detail is not in correct status',
  );
}
