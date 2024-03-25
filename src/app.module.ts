import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CacheInterceptor,
  CacheModule,
  CacheModuleOptions,
} from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { MonsterModule } from './monster/monster.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { RequestIdMiddleware } from './common/middleware/request-id/request-id.middleware';
import { CommonModule } from './common/common.module';

import { loadConfig } from './config/env.config';
import { validationSchema } from './config/env-schema.config';
import { AuthModule } from './auth/auth.module';

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
        /* istanbul ignore next */
        return {
          store: redisStore,
          isGlobal: true,
          host: redisConfig.host,
          port: redisConfig.port,
          ttl: cacheConfig.ttl,
          password: redisConfig.password, // no need it in local
          user: redisConfig.user, // no need it in local
        };
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        /* istanbul ignore next */
        // const node_env = configService.get('NODE_ENV');
        // const dbHost = configService.get('DB_HOST');
        const dbName = configService.get('DB_NAME');
        const mongoConfig = configService.get('MONGO_URL');
        /* istanbul ignore next */
        return { uri: mongoConfig, dbName: dbName };
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const throttlerConfig = configService.get('REQUEST_RATE_LIMIT');
        return [
          {
            ttl: throttlerConfig.ttl,
            limit: throttlerConfig.limit,
          },
        ];
      },
    }),
    MonsterModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
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
