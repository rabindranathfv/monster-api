import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MonsterService } from './monster.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';

@Controller('monster')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Post()
  create(@Body() createMonsterDto: CreateMonsterDto) {
    return this.monsterService.createMonster(createMonsterDto);
  }

  @Get()
  findAll() {
    return this.monsterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monsterService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMonsterDto: UpdateMonsterDto) {
    return this.monsterService.updateMonster(id, updateMonsterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedMonster = await this.monsterService.deleteMonster(id);

    if (!deletedMonster) {
      return {
        message: `monster can not be deleted`,
      };
    }

    return {
      message: `monster ${id} named ${deletedMonster.name.first} is delete successfully`,
    };
  }
}
