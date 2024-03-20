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
} from '@nestjs/common';
import { MonsterService } from './monster.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('monster')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Post()
  async create(@Body() createMonsterDto: CreateMonsterDto) {
    try {
      return await this.monsterService.createMonster(createMonsterDto);
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.controller.ts:26 ~ MonsterController ~ create ~ error:',
        error,
      );

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
    try {
      return await this.monsterService.findOne(id);
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.controller.ts:68 ~ MonsterController ~ findOne ~ error:',
        error,
      );

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateMonsterDto: UpdateMonsterDto,
  ) {
    try {
      return await this.monsterService.updateMonster(id, updateMonsterDto);
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.controller.ts:93 ~ MonsterController ~ error:',
        error,
      );

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    try {
      const deletedMonster = await this.monsterService.deleteMonster(id);

      if (!deletedMonster) {
        return {
          message: `monster can not be deleted`,
        };
      }

      return {
        message: `monster ${id} is delete successfully`,
      };
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.controller.ts:130 ~ MonsterController ~ remove ~ error:',
        error,
      );

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
