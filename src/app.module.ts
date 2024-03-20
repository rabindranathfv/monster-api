import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CacheInterceptor,
  CacheModule,
  CacheModuleOptions,
} from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { MonsterModule } from './monster/monster.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { RequestIdMiddleware } from './common/middleware/request-id/request-id.middleware';
import { CommonModule } from './common/common.module';

import { loadConfig } from './config/env.config';
import { validationSchema } from './config/env-schema.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}.local`,
      load: [loadConfig],
      validationSchema,
      isGlobal: true,
    }),
    CacheModule.registerAsync<Promise<CacheModuleOptions>>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        /* istanbul ignore next */
        const redisConfig = configService.get('REDIS');
        const cacheConfig = configService.get('CACHE');
        console.log(
          'CONFIG REDIS*************',
          redisConfig.host,
          redisConfig.port,
          cacheConfig.ttl,
        );
        /* istanbul ignore next */
        return {
          store: redisStore,
          isGlobal: true,
          host: redisConfig.host,
          port: redisConfig.port,
          ttl: cacheConfig.ttl,
        };
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        /* istanbul ignore next */
        const node_env = configService.get('NODE_ENV');
        const dbHost = configService.get('DB_HOST');
        const mongoConfig = configService.get('MONGO_URL');
        console.log(
          '🚀 ~ file: app.module.ts:24 ~ mongoConfig:',
          node_env,
          dbHost,
          mongoConfig,
        );
        /* istanbul ignore next */
        return { uri: mongoConfig };
      },
    }),
    MonsterModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  /* istanbul ignore next */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
