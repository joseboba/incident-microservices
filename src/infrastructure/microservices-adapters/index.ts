import { GetUserAppByEmailAdapter } from './get-user-app-by-email-adapter.service';
import { GetEquipmentLocationByIdAdapterService } from './get-equipment-location-by-id-adapter.service';
export * from './get-equipment-location-by-id-adapter.service';
export * from './get-user-app-by-email-adapter.service';

export const MicroservicesAdapters = [
  GetEquipmentLocationByIdAdapterService,
  GetUserAppByEmailAdapter,
];