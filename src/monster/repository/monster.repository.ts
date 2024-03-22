import { PaginatedDto } from 'src/common/dto/pagination.dto';
import { CreateMonsterDto } from '../dto/create-monster.dto';
import { ResponseMonsterDto } from '../dto/response-monster.dto';
import { Monster } from '../schema/monster.schema';
import { UpdateMonsterDto } from '../dto/update-monster.dto';

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
  addGold(id: string, amount: number): Promise<Monster>;
  removeGold(id: string, amount: number): Promise<Monster>;
}
