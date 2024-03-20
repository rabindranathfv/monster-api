import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonsterModule } from './monster/monster.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { loadConfig } from './config/env.config';
import { validationSchema } from './config/env-schema.config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}.local`,
      load: [loadConfig],
      validationSchema,
      isGlobal: true,
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
  providers: [AppService],
})
export class AppModule {}
