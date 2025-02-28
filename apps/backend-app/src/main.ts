/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { AppModule } from './app/app.module';
import { AppService } from './app/app.service';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', "debug", "verbose"],
  });
  const appConfig = app.get(AppService).getAppConfig();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = appConfig.port || 8081;
  const host = appConfig.host || 'localhost';
  console.log(appConfig.host, host);
  app.listen(port, host, () => {
    Logger.log(`Listening at http://${host}:${port}/${globalPrefix}`);
  });
}

bootstrap();
