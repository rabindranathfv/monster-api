import { Module } from '@nestjs/common';
import { MonsterService } from './monster.service';
import { MonsterController } from './monster.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Monster, MonsterSchema } from './entities/monster.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Monster.name,
        schema: MonsterSchema,
      },
    ]),
    CommonModule,
  ],
  controllers: [MonsterController],
  providers: [MonsterService],
  exports: [MongooseModule],
})
export class MonsterModule {}
