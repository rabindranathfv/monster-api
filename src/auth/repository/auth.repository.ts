import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { User } from 'src/auth/shema/user.schema';
import { LoginFail } from 'src/auth/types/user.types';

export const AUTH_REPOSITORY = 'AuthRepository';

export interface AuthRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
}
