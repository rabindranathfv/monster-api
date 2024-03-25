import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../shema/user.schema';
import { USER_REPOSITORY } from './repository/user.repository';
import { UserAdapterRepository } from './repository/user-adapter.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserAdapterRepository,
  ) {}

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne(id);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.userRepository.remove(id);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
