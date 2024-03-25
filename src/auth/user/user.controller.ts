import {
  Controller,
  Get,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
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

import { UserService } from './user.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { mapUserWithoutPsw } from '../helpers/user-map.helper';
import { ApiKeyAuthGuard } from '../guard/api-key-auth.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RoleProtected } from '../decorators/role-protected.decorator';
import { Role } from '../types/user.types';
import { RolesGuard } from '../guard/roles.guard';
import { User } from '../shema/user.schema';

@ApiBearerAuth()
@ApiHeader({
  name: 'x-api-key',
  description: 'consume for endpoint type',
  required: true,
  example: 'PUBLIC',
})
@ApiTags('User')
@UseGuards(ApiKeyAuthGuard, JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user deleted successfully',
    type: User,
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
    description: 'this user does not exist or this id is not a valid mongoId',
  })
  @RoleProtected(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`this user ${id} doesn't exist`);
    }

    return mapUserWithoutPsw(user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user deleted successfully',
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
    description: 'this user does not exist or this id is not a valid mongoId',
  })
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
