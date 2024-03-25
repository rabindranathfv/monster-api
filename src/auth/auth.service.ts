import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { compareSync } from 'bcrypt';

import { AUTH_REPOSITORY } from './repository/auth.repository';
import { AuthAdapterRepository } from './repository/auth-adapter.repository';
import { USER_REPOSITORY } from './user/repository/user.repository';
import { UserAdapterRepository } from './user/repository/user-adapter.repository';

import { User } from 'src/auth/shema/user.schema';
import { LoginFail } from './types/user.types';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

import { mapUserAuth } from './helpers/use-auth-map.helper';

@Injectable()
export class AuthService {
  private readonly apiKeyService;
  constructor(
    private readonly configServ: ConfigService,
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthAdapterRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserAdapterRepository,
    private readonly jwtService: JwtService,
  ) {
    this.apiKeyService = this.configServ.get('API_KEY');
  }

  validateApiKey(apikey: string): boolean {
    return this.apiKeyService === apikey || apikey === 'PUBLIC';
  }

  private async getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.authRepository.create(createUserDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<Partial<User> | LoginFail> {
    try {
      const { password, email } = loginUserDto;
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        return user;
      }

      if (!compareSync(password, user.password)) {
        return { password: true };
      }

      const token = await this.getJwtToken({
        id: user._id,
        fullName: user.fullName,
        role: user.role,
        email: user.email,
      });

      return mapUserAuth(user, token);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
