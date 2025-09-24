// Custom file imports

import {
  IncidentDetailEntity,
  IncidentDetailStatusEntity,
  IncidentEntity,
  IncidentPriorityLevelEntity,
  IncidentStatusHistoryEntity,
  IncidentTypeEntity,
} from '@entities';

export const config = {
  db: {
    entities: [
      IncidentEntity,
      IncidentDetailEntity,
      IncidentDetailStatusEntity,
      IncidentPriorityLevelEntity,
      IncidentStatusHistoryEntity,
      IncidentTypeEntity,
    ],
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA,
    jwt: {
      secret: process.env.JWT_SECRET,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      audience: process.env.JWT_AUDIENCE,
    },
  },
  user: {
    getUserAppByUserAppId: {
      baseUrl: 'http://localhost:3000',
      resourcePath: 'api/user/:email',
    },
  },
  equipmentLocation: {
    getEquipmentLocationById: {
      baseUrl: 'http://localhost:3001',
      resourcePath: 'api/equipment-location/:id',
    },
  },
};
