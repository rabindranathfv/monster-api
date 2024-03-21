import { JwtPayload } from '../interfaces/jwt-payload.interface';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PUBLIC = 'PUBLIC',
}

export interface LoginFail {
  password: boolean;
}