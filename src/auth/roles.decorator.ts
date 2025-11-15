// src/auth/roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/enum/roles.enum'; // Import your enum

export const ROLES_KEY = 'roles';
// Accepts a single role or an array of roles
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);