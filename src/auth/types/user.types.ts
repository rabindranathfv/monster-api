export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PUBLIC = 'PUBLIC',
}

export interface LoginFail {
  password: boolean;
}
