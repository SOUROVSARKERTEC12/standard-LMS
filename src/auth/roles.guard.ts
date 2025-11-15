// src/auth/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from 'src/user/enum/roles.enum';
import { AuthenticatedRequest } from 'src/common/interfaces/request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Get the required roles defined by the @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [
        context.getHandler(), // Check method handler
        context.getClass(), // Check controller class
      ],
    );

    // If no roles are defined on the route (e.g., findAll), allow access
    if (!requiredRoles) {
      return true;
    }

    // 2. Get the authenticated user's role from the request
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const userRole = request.user.role as UserRole;

    // 3. Check if the user's role is included in the required roles list
    return requiredRoles.includes(userRole);
  }
}
