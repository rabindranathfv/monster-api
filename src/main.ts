import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  const configServ = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const PORT = configServ.get<number>('PORT');
  console.log('🚀 ~ file: main.ts:22 ~ bootstrap ~ PORT:', PORT);
  const NODE_ENV = configServ.get<string>('NODE_ENV');
  console.log('🚀 ~ file: main.ts:24 ~ bootstrap ~ NODE_ENV:', NODE_ENV);

  await app.listen(3000);
}
bootstrap();
