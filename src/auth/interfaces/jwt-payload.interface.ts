import { Role } from "../types/user.types";

export interface JwtPayload {
  id: string;
  role?: Role;
  email?: string;
}
