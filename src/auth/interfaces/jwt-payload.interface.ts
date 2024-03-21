import { User } from '../shema/user.schema';
import { Role } from '../types/user.types';

export interface JwtPayload {
  id: string;
  fullName: string;
  role: Role;
  email: string;
}
