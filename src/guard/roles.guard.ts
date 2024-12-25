import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get(Roles, context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
    }

    const hasRequiredRole = this.matchRoles(requiredRoles, user.roles);

    if (!hasRequiredRole) {
      throw new HttpException(
        'Forbidden: You do not have the required permissions',
        HttpStatus.FORBIDDEN,
      );
    }

    return hasRequiredRole;
  }

  matchRoles(roles: string[], userRoles: string[]) {
    if (userRoles.length <= 0) {
      return false;
    }

    return userRoles.some((userRole) => roles.includes(userRole));
  }
}
