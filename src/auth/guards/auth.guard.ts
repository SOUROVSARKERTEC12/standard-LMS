// src/auth/auth.guard.ts

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthenticatedRequest } from 'src/common/interfaces/request.interface';
import { Reflector } from '@nestjs/core'; // <-- Make sure Reflector is imported
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'; // <-- Import the new key

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Check for Public Decorator
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If the route is marked as public, allow access immediately, bypassing token check.
    if (isPublic) {
      return true;
    }
    // Cast the request to our custom interface for type safety
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token required.');
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET'); // 💡 Get secret dynamically

      const payload = await this.jwtService.verifyAsync(token, {
        secret: secret, // Use the dynamically loaded secret
      });

      // 💡 Assign the payload to the typed 'user' property
      request.user = payload;
    } catch (e) {
      // Catch token verification errors (expired, invalid signature, etc.)
      throw new UnauthorizedException('Invalid or expired token.');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' && token ? token : undefined;
  }
}
