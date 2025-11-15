// src/auth/dto/login.user.dto.ts

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  
  // Email: Must not be empty and must be a valid email format
  @IsNotEmpty({ message: 'Email is required for login.' })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;
  
  // Password: Must not be empty (validation for length/complexity is often done here too)
  @IsNotEmpty({ message: 'Password is required for login.' })
  @IsString()
  password: string;
}