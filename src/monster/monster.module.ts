import { Module } from '@nestjs/common';
import { MonsterService } from './monster.service';
import { MonsterController } from './monster.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Monster, MonsterSchema } from './entities/monster.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Monster.name,
        schema: MonsterSchema,
      },
    ]),
  ],
  controllers: [MonsterController],
  providers: [MonsterService],
  exports: [MongooseModule],
})
export class MonsterModule {}
