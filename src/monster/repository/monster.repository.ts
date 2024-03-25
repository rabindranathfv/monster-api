import { PaginatedDto } from 'src/common/dto/pagination.dto';
import { CreateMonsterDto } from '../dto/create-monster.dto';
import { ResponseMonsterDto } from '../dto/response-monster.dto';
import { UpdateMonsterDto } from '../dto/update-monster.dto';
import { Monster } from '../schema/monster.schema';
import { AddOrRemoveGoldMonsterDto } from '../dto/add-or-remove-gold-monster.dto';

export const MONSTER_REPOSITORY = 'MonsterRepository';

export interface MonsterRepository {
  createMonster(createMonsterDto: CreateMonsterDto): Promise<Monster>;
  findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedDto<ResponseMonsterDto>>;
  findOne(id: string): Promise<Monster>;
  updateMonster(
    id: string,
    updateMonsterDto: UpdateMonsterDto,
  ): Promise<Monster>;
  deleteMonster(id: string): Promise<Monster>;
  addGold(
    id: string,
    addOrRemoveGoldMonsterDto: AddOrRemoveGoldMonsterDto,
  ): Promise<Monster>;
  removeGold(
    id: string,
    addOrRemoveGoldMonsterDto: AddOrRemoveGoldMonsterDto,
  ): Promise<Monster>;
  populateDBWithMonster(): Promise<any[]>;
}
