import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { hashSync, compareSync, genSaltSync } from 'bcrypt';

import { User } from 'src/auth/shema/user.schema';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginFail } from '../types/user.types';

@Injectable()
export class AuthService {
  private readonly apiKeyService;
  constructor(
    private readonly configServ: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
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
      const { password, ...userData } = createUserDto;

      const userInstance = new this.userModel({
        ...userData,
        password: hashSync(password, genSaltSync()),
      });
      return await userInstance.save();
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

      const user = await this.userService.findByEmail(email);

      if (!user) {
        return user;
      }

      if (!compareSync(password, user.password)) {
        return { password: false };
      }

      const token = await this.getJwtToken({
        id: user._id,
        fullName: user.fullName,
        role: user.role,
        email: user.email,
      });

      const v = {
        id: user._id,
        fullName: user.fullName,
        role: user.role,
        email: user.email,
        token,
      };
      return v;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
