import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Monster } from './entities/monster.entity';

@Injectable()
export class MonsterService {
  constructor(
    @InjectModel(Monster.name) private readonly monsterModel: Model<Monster>,
  ) {}

  async createMonster(createMonsterDto: CreateMonsterDto): Promise<Monster> {
    console.log(
      '🚀 ~ file: monster.service.ts:15 ~ MonsterService ~ createMonster ~ createMonsterDto:',
      createMonsterDto,
    );

    try {
      // const { name, ...restMonsterDto } = createMonsterDto;

      // const monsterInstance = new this.monsterModel({
      //   name,
      //   ...restMonsterDto,
      // });
      const monsterInstance = new this.monsterModel(createMonsterDto);

      const newMonster = await monsterInstance.save();
      return newMonster;
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.service.ts:24 ~ MonsterService ~ createMonster ~ error:',
        error,
      );

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Monster[]> {
    try {
      return await this.monsterModel.find().exec();
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.service.ts:43 ~ MonsterService ~ findAll ~ error:',
        error,
      );

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Monster> {
    try {
      return await this.monsterModel.findById(id);
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.service.ts:59 ~ MonsterService ~ findOne ~ error:',
        error,
      );

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateMonster(
    id: string,
    updateMonsterDto: UpdateMonsterDto,
  ): Promise<Monster> {
    try {
      return await this.monsterModel.findByIdAndUpdate(id, updateMonsterDto, {
        new: true,
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.service.ts:80 ~ MonsterService ~ error:',
        error,
      );

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMonster(id: string): Promise<Monster> {
    try {
      const monsterDeleted = await this.monsterModel.findByIdAndDelete(id);
      return monsterDeleted;
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.service.ts:97 ~ MonsterService ~ deleteMonster ~ error:',
        error,
      );

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
