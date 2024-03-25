import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PaginatedDto } from 'src/common/dto/pagination.dto';
import { MonsterRepository } from './monster.repository';

import { Monster } from '../schema/monster.schema';
import { CreateMonsterDto } from '../dto/create-monster.dto';
import { ResponseMonsterDto } from '../dto/response-monster.dto';
import { UpdateMonsterDto } from '../dto/update-monster.dto';
import { AddOrRemoveGoldMonsterDto } from '../dto/add-or-remove-gold-monster.dto';

import monsterSeed from '../data/monster.json';

@Injectable()
export class MonsterAdapterRepository implements MonsterRepository {
  constructor(
    @InjectModel(Monster.name) private readonly monsterModel: Model<Monster>,
  ) {}
  async populateDBWithMonster(): Promise<any[]> {
    try {
      const monsterInserted = await this.monsterModel.insertMany(monsterSeed);

      return monsterInserted;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error - trying SEED MONSTERS',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

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

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedDto<ResponseMonsterDto>> {
    try {
      const monsters = await this.monsterModel
        .find()
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
      const monsterCount = await this.monsterModel.countDocuments().exec();
      return new PaginatedDto(monsters, page, limit, monsterCount);
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

  async addGold(
    id: string,
    addOrRemoveGoldMonsterDto: AddOrRemoveGoldMonsterDto,
  ): Promise<Monster> {
    try {
      const { amount } = addOrRemoveGoldMonsterDto;
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

  async removeGold(
    id: string,
    addOrRemoveGoldMonsterDtomount: AddOrRemoveGoldMonsterDto,
  ): Promise<Monster> {
    try {
      const { amount } = addOrRemoveGoldMonsterDtomount;
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
