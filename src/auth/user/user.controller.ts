import {
  Controller,
  Get,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { mapUserWithoutPsw } from '../helpers/user-map.helper';
import { ApiKeyAuthGuard } from '../guard/api-key-auth.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RoleProtected } from '../decorators/role-protected.decorator';
import { Role } from '../types/user.types';
import { RolesGuard } from '../guard/roles.guard';

@UseGuards(ApiKeyAuthGuard, JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RoleProtected(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`this user ${id} doesn't exist`);
    }

    return mapUserWithoutPsw(user);
  }

  @RoleProtected(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    const user = await this.userService.remove(id);

    if (!user) {
      throw new NotFoundException(`this user ${id} doesn't exist`);
    }

    return { message: `userID :${id} is deleted` };
  }
}
