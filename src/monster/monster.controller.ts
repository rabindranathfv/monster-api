import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { MonsterService } from './monster.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Monster } from './entities/monster.entity';

@Controller('monster')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Post()
  async create(@Body() createMonsterDto: CreateMonsterDto) {
    return await this.monsterService.createMonster(createMonsterDto);
  }

  @Get()
  async findAll() {
    try {
      return await this.monsterService.findAll();
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.controller.ts:51 ~ MonsterController ~ findAll ~ error:',
        error,
      );

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    const monster = await this.monsterService.findOne(id);

    if (!monster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }

    return monster;
  }

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
