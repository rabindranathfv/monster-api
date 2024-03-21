import {
  Controller,
  Get,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`this user ${id} doesn't exist`);
    }

    return user;
  }

  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    const user = await this.userService.remove(id);

    if (!user) {
      throw new NotFoundException(`this user ${id} doesn't exist`);
    }

    return user;
  }
}
