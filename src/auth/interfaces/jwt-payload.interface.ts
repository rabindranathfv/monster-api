import { Role } from '../types/user.types';

export interface JwtPayload {
  id: string;
  fullName: string;
  role: Role;
  email: string;
}
