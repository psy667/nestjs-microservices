import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useLogger(app.get(Logger));

  const port = configService.get('PORT');

  await app.listen(port);
}
bootstrap();
