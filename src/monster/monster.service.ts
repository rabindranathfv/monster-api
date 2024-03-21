import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Monster } from './schema/monster.schema';

@Injectable()
export class MonsterService {
  constructor(
    @InjectModel(Monster.name) private readonly monsterModel: Model<Monster>,
  ) {}

  async createMonster(createMonsterDto: CreateMonsterDto): Promise<Monster> {
    try {
      const monsterInstance = new this.monsterModel(createMonsterDto);

      const newMonster = await monsterInstance.save();
      return newMonster;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Monster[]> {
    try {
      return await this.monsterModel.find();
    } catch (error) {
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
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMonster(id: string): Promise<Monster> {
    try {
      return await this.monsterModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addGold(id: string, amount: number): Promise<Monster> {
    try {
      return await this.monsterModel.findByIdAndUpdate(
        id,
        { $inc: { goldBalance: amount } },
        { new: true },
      );
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeGold(id: string, amount: number): Promise<Monster> {
    try {
      return await this.monsterModel.findByIdAndUpdate(
        id,
        { $inc: { goldBalance: -amount } },
        { new: true },
      );
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
