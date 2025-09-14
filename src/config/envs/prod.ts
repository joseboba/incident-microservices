export const config = {
  db: {
    synchronize: false,
    logging: false,
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  },
  user: {
    getUserAppByUserAppId: {
      baseUrl: 'http://user-micro:3000',
      resourcePath: 'api/user/:email',
    },
  },
};
