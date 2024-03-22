import { User } from 'src/auth/shema/user.schema';

export const USER_REPOSITORY = 'UserRepository';

export interface UserRepository {
  findOne(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  remove(id: string): Promise<User>;
}
