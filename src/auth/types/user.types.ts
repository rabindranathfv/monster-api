import { User } from '../shema/user.schema';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PUBLIC = 'PUBLIC',
}

export interface LoginFail {
  password: boolean;
}
