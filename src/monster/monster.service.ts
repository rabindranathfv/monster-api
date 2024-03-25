import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Monster } from './schema/monster.schema';
import { PaginatedDto } from '../common/dto/pagination.dto';
import { ResponseMonsterDto } from './dto/response-monster.dto';
import { MonsterAdapterRepository } from './repository/monster-adapter.repository';
import { MONSTER_REPOSITORY } from './repository/monster.repository';
import { AddOrRemoveGoldMonsterDto } from './dto/add-or-remove-gold-monster.dto';

@Injectable()
export class MonsterService {
  constructor(
    @Inject(MONSTER_REPOSITORY)
    private readonly monsterRepository: MonsterAdapterRepository,
  ) {}

  async createMonster(createMonsterDto: CreateMonsterDto): Promise<Monster> {
    try {
      return await this.monsterRepository.createMonster(createMonsterDto);
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
      return await this.monsterRepository.findAll(page, limit);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Monster> {
    try {
      return await this.monsterRepository.findOne(id);
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
      return await this.monsterRepository.updateMonster(id, updateMonsterDto);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMonster(id: string): Promise<Monster> {
    try {
      return await this.monsterRepository.deleteMonster(id);
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
      return await this.monsterRepository.addGold(
        id,
        addOrRemoveGoldMonsterDto,
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
    addOrRemoveGoldMonsterDto: AddOrRemoveGoldMonsterDto,
  ): Promise<Monster> {
    try {
      return await this.monsterRepository.removeGold(
        id,
        addOrRemoveGoldMonsterDto,
      );
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async populateDBWithMonster() {
    try {
      return await this.monsterRepository.populateDBWithMonster();
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
