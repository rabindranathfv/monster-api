import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';

import { MonsterService } from './monster.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { ApiKeyAuthGuard } from 'src/auth/guard/api-key-auth.guard';

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Monster } from './schema/monster.schema';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { Role } from 'src/auth/types/user.types';
import { PaginationQueryParamsDto } from 'src/common/dto/pagination-query-params.dto';
import { PaginatedDto } from 'src/common/dto/pagination.dto';
import { ResponseMonsterDto } from './dto/response-monster.dto';

@ApiTags('Products')
@UseGuards(ApiKeyAuthGuard, JwtAuthGuard, RolesGuard)
@Controller('monster')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @SkipThrottle()
  @RoleProtected(Role.ADMIN, Role.USER)
  @Post()
  async create(@Body() createMonsterDto: CreateMonsterDto) {
    return await this.monsterService.createMonster(createMonsterDto);
  }

  @RoleProtected(Role.PUBLIC, Role.ADMIN, Role.USER)
  @Get()
  async findAll(
    @Query() paginationQueryParams: PaginationQueryParamsDto,
  ): Promise<PaginatedDto<ResponseMonsterDto>> {
    const { page, limit } = paginationQueryParams;
    return await this.monsterService.findAll(page, limit);
  }

  @Throttle({ default: { limit: 3, ttl: 10 } })
  @RoleProtected(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    const monster = await this.monsterService.findOne(id);

    if (!monster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }

    return monster;
  }

  @SkipThrottle()
  @RoleProtected(Role.ADMIN, Role.USER)
  @Put(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateMonsterDto: UpdateMonsterDto,
  ) {
    const monster = await this.monsterService.updateMonster(
      id,
      updateMonsterDto,
    );

    if (!monster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }

    return monster;
  }

  @SkipThrottle()
  @RoleProtected(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    const deletedMonster = await this.monsterService.deleteMonster(id);

    if (!deletedMonster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }

    return {
      message: `monster ${id} is delete successfully`,
    };
  }

  @SkipThrottle()
  @RoleProtected(Role.ADMIN)
  @Post(':id/add-gold')
  async addGold(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body('amount') amount: number,
  ): Promise<Monster> {
    const monster = await this.monsterService.addGold(id, amount);

    if (!monster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }
    return monster;
  }

  @SkipThrottle()
  @RoleProtected(Role.ADMIN)
  @Post(':id/remove-gold')
  async removeGold(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body('amount') amount: number,
  ): Promise<Monster> {
    const monster = await this.monsterService.removeGold(id, amount);

    if (!monster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }

    return monster;
  }
}
