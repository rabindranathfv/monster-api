import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonsterModule } from './monster/monster.module';

@Module({
  imports: [MonsterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
