import { SetMetadata } from '@nestjs/common';
import { Role } from '../types/user.types';
import { META_ROLES } from '../constants/constants';

export const RoleProtected = (...args: Role[]) => {
  return SetMetadata(META_ROLES, args);
};
