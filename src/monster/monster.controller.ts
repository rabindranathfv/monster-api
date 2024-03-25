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
  HttpStatus,
} from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

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
import { AddOrRemoveGoldMonsterDto } from './dto/add-or-remove-gold-monster.dto';

@ApiBearerAuth()
@ApiHeader({
  name: 'x-api-key',
  description: 'consume for endpoint type',
  required: true,
  example: 'BoredMike',
})
@ApiTags('Monster')
@UseGuards(ApiKeyAuthGuard, JwtAuthGuard, RolesGuard)
@Controller('monster')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Monster was created succesfully',
    type: Monster,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, login related o APIKEY related',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, Token related',
  })
  @ApiBadRequestResponse({
    description: 'Some fields are missing',
  })
  @SkipThrottle()
  @RoleProtected(Role.ADMIN, Role.USER)
  @Post()
  async create(@Body() createMonsterDto: CreateMonsterDto) {
    return await this.monsterService.createMonster(createMonsterDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Monster list',
    type: [PaginatedDto<ResponseMonsterDto>],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, login related o APIKEY related',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, Token related',
  })
  @ApiBadRequestResponse({
    description: 'Some fields are missing',
  })
  @RoleProtected(Role.PUBLIC, Role.ADMIN, Role.USER)
  @Get()
  async findAll(
    @Query() paginationQueryParams: PaginationQueryParamsDto,
  ): Promise<PaginatedDto<ResponseMonsterDto>> {
    const { page, limit } = paginationQueryParams;
    return await this.monsterService.findAll(page, limit);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Monster list',
    type: [Monster],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, login related o APIKEY related',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, Token related',
  })
  @ApiBadRequestResponse({
    description: 'Some fields are missing or this id is not a valid mongoId',
  })
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Monster list',
    type: [Monster],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, login related o APIKEY related',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, Token related',
  })
  @ApiBadRequestResponse({
    description: 'Some fields are missing or this id is not a valid mongoId',
  })
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Monster delete by Id',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, login related o APIKEY related',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, Token related',
  })
  @ApiBadRequestResponse({
    description: 'Some fields are missing or this id is not a valid mongoId',
  })
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Monster goldBalance should be higher',
    type: Monster,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, login related o APIKEY related',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, Token related',
  })
  @ApiBadRequestResponse({
    description: 'Some fields are missing or this id is not a valid mongoId',
  })
  @SkipThrottle()
  @RoleProtected(Role.ADMIN)
  @Post(':id/add-gold')
  async addGold(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() addOrRemoveGoldMonsterDto: AddOrRemoveGoldMonsterDto,
  ): Promise<Monster> {
    const monster = await this.monsterService.addGold(
      id,
      addOrRemoveGoldMonsterDto,
    );

    if (!monster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }
    return monster;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Monster goldBalance should be less',
    type: Monster,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, login related o APIKEY related',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, Token related',
  })
  @ApiBadRequestResponse({
    description: 'Some fields are missing or this id is not a valid mongoId',
  })
  @SkipThrottle()
  @RoleProtected(Role.ADMIN)
  @Post(':id/remove-gold')
  async removeGold(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() addOrRemoveGoldMonsterDto: AddOrRemoveGoldMonsterDto,
  ): Promise<Monster> {
    const monster = await this.monsterService.removeGold(
      id,
      addOrRemoveGoldMonsterDto,
    );

    if (!monster) {
      throw new NotFoundException(`this monster ${id} doesn't exist`);
    }

    return monster;
  }
}
