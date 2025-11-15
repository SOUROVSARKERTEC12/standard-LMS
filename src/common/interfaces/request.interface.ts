// src/common/interfaces/request.interface.ts

import { Request } from 'express';

// Define the structure of the JWT payload we put on the request
interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  username: string;
}

// Extend the Express Request type
export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}