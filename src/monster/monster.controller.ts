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
  // TODO: add validation Pipe
  async create(@Body() createMonsterDto: CreateMonsterDto) {
    try {
      return await this.monsterService.createMonster(createMonsterDto);
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.controller.ts:26 ~ MonsterController ~ create ~ error:',
        error,
      );

      if (error.name === 'MongoError' && error.code === 11000) {
        // Handle duplicate name error
        throw new HttpException(
          'Monster name already exists',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
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

      if (error.name === 'CastError') {
        throw new HttpException('Invalid monster ID', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Put(':id')
  // TODO: add validation Pipe
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

      if (error.name === 'CastError') {
        throw new HttpException('Invalid monster ID', HttpStatus.BAD_REQUEST);
      } else if (error.name === 'MongoError' && error.code === 11000) {
        // Handle duplicate name error
        throw new HttpException(
          'Monster name already exists',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
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
        message: `monster ${id} named ${deletedMonster.name.first} is delete successfully`,
      };
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.controller.ts:130 ~ MonsterController ~ remove ~ error:',
        error,
      );

      if (error.name === 'CastError') {
        throw new HttpException('Invalid monster ID', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
