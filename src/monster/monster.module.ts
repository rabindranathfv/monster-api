import { Module } from '@nestjs/common';
import { MonsterService } from './monster.service';
import { MonsterController } from './monster.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Monster, MonsterSchema } from './schema/monster.schema';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
import { MONSTER_REPOSITORY } from './repository/monster.repository';
import { MonsterAdapterRepository } from './repository/monster-adapter.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Monster.name,
        schema: MonsterSchema,
      },
    ]),
    CommonModule,
    AuthModule,
  ],
  controllers: [MonsterController],
  providers: [
    MonsterService,
    {
      provide: MONSTER_REPOSITORY,
      useClass: MonsterAdapterRepository,
    },
  ],
  exports: [MongooseModule],
})
export class MonsterModule {}
