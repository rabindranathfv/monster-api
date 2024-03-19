import { Injectable } from '@nestjs/common';
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
    try {
      console.log(
        '🚀 ~ file: monster.service.ts:15 ~ MonsterService ~ createMonster ~ createMonsterDto:',
        createMonsterDto,
      );
      const newMonster = await this.monsterModel.create(createMonsterDto);
      return newMonster;
    } catch (error) {
      console.log(
        '🚀 ~ file: monster.service.ts:26 ~ MonsterService ~ createMonster ~ error:',
        error,
      );
    }
  }

  async findAll(): Promise<Monster[]> {
    return await this.monsterModel.find().exec();
  }

  async findOne(id: string): Promise<Monster> {
    return await this.monsterModel.findById(id).exec();
  }

  async updateMonster(
    id: string,
    updateMonsterDto: UpdateMonsterDto,
  ): Promise<Monster> {
    return await this.monsterModel.findByIdAndUpdate(id, updateMonsterDto, {
      new: true,
    });
  }

  async deleteMonster(id: string): Promise<any> {
    const monsterDeleted = await this.monsterModel.findByIdAndDelete(id);
    return monsterDeleted;
  }
}
