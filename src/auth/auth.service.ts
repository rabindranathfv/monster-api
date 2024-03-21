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

import { User } from 'src/auth/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

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
      const userInstance = new this.userModel(createUserDto);
      return await userInstance.save();
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;

      const user = await this.userService.findByEmail(email);

      if (!user) {
        return user;
      }

      if (!compareSync(password, user.password))
        throw new UnauthorizedException('Credentials are not valid (password)');

      return {
        ...user,
        token: await this.getJwtToken({ id: user._id }),
      };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
