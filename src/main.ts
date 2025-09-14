import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureMicroservice } from 'incident-management-commons/dist/bootstrapping';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureMicroservice(app, {
    title: 'Incident Microservices',
    description: 'API for incident microservices',
    version: '1.0',
    basePath: 'api/incident',
  });

  const configService = app.select(AppModule).get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}

bootstrap();
