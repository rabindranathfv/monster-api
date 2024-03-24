import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './shema/user.schema';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'user register',
    type: User,
  })
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
}
