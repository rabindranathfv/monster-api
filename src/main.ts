import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
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

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Monster Api')
    .setDescription('The Monster API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  const PORT = configServ.get<number>('PORT');
  console.log('🚀 ~ file: main.ts:22 ~ bootstrap ~ PORT:', PORT);
  const NODE_ENV = configServ.get<string>('NODE_ENV');
  console.log('🚀 ~ file: main.ts:24 ~ bootstrap ~ NODE_ENV:', NODE_ENV);

  await app.listen(PORT);
}
bootstrap();
