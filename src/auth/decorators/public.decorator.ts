// src/auth/public.decorator.ts

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// Sets metadata indicating the route should be public
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);