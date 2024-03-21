import { Reflector } from '@nestjs/core';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { META_ROLES } from '../constants/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      META_ROLES,
      ctx.getHandler(),
    );

    if (!requiredRoles) return true;
    if (requiredRoles.length === 0) return true;

    const { user } = ctx.switchToHttp().getRequest();

    if (!user)
      throw new BadRequestException('User not found, try to login again');

    return requiredRoles.some((role) => user.role === role);
  }
}
