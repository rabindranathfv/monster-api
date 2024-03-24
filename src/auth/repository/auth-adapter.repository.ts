import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { hashSync, genSaltSync } from 'bcrypt';

import { AuthRepository } from './auth.repository';

import { User } from 'src/auth/shema/user.schema';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class AuthAdapterRepository implements AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

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
}
