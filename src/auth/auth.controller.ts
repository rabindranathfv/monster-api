import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';

import { AuthService } from './user/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthJWTGuard } from './guard/jwt-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const userLogin = await this.authService.login(loginUserDto);

    if (!userLogin) {
      throw new UnauthorizedException(
        'Credentials are not valid, please check your email',
      );
    }

    if (userLogin.password) {
      throw new UnauthorizedException(
        'Credentials are not valid, please check your password',
      );
    }

    return userLogin;
  }

  @UseGuards(AuthJWTGuard)
  @Get('private')
  async check(@Req() req: Request) {
        return 'private working';
  }
}
