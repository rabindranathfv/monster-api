import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

import { MonsterService } from './monster.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { ApiKeyAuthGuard } from 'src/auth/guard/api-key-auth.guard';

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Monster } from './schema/monster.schema';

@UseGuards(ApiKeyAuthGuard)
@Controller('monster')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @SkipThrottle()
  @Post()
  async create(@Body() createMonsterDto: CreateMonsterDto) {
    return await this.monsterService.createMonster(createMonsterDto);
  }

  @Get()
  async findAll() {
    const monsters = await this.monsterService.findAll();
    return monsters;
  }

  @Throttle({ default: { limit: 3, ttl: 10 } })
  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    const monster = await this.monsterService.findOne(id);

    if (!monster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }

    return monster;
  }

  @SkipThrottle()
  @Put(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateMonsterDto: UpdateMonsterDto,
  ) {
    const monster = await this.monsterService.updateMonster(
      id,
      updateMonsterDto,
    );

    if (!monster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }

    return monster;
  }

  @SkipThrottle()
  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    const deletedMonster = await this.monsterService.deleteMonster(id);

    if (!deletedMonster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }

    return {
      message: `monster ${id} is delete successfully`,
    };
  }

  @SkipThrottle()
  @Post(':id/add-gold')
  async addGold(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body('amount') amount: number,
  ): Promise<Monster> {
    const monster = await this.monsterService.addGold(id, amount);

    if (!monster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }
    return monster;
  }

  @SkipThrottle()
  @Post(':id/remove-gold')
  async removeGold(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body('amount') amount: number,
  ): Promise<Monster> {
    const monster = await this.monsterService.removeGold(id, amount);

    if (!monster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }

    return monster;
  }
}
