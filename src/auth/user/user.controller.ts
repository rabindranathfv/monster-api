import {
  Controller,
  Get,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { mapUserWithoutPsw } from '../helpers/user-map.helper';
// import { ApiKeyAuthGuard } from '../guard/api-key-auth.guard';

// @UseGuards(ApiKeyAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`this user ${id} doesn't exist`);
    }

    return mapUserWithoutPsw(user);
  }

  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    const user = await this.userService.remove(id);

    if (!user) {
      throw new NotFoundException(`this user ${id} doesn't exist`);
    }

    return { message: `userID :${id} is deleted` };
  }
}
