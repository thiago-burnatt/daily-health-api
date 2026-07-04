import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppModule } from '../src/app.module';

let app: INestApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }
  return app;
}

export default async function handler(req: Request, res: Response) {
  const app = await bootstrap();
  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
  const server = app.getHttpAdapter().getInstance();
  server(req, res);
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
}
