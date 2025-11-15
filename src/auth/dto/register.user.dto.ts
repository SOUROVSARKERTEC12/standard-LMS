// src/auth/dto/registerUser.dto.ts

import { UserRole } from 'src/user/enum/roles.enum';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class RegisterDto {
  // First Name (Required by default if you removed nullable: true in entity)
  @IsNotEmpty({ message: 'First name is required.' })
  @IsString()
  fname: string;

  // Last Name (Assumed optional, but should be validated if present)
  // If you require this field, change IsOptional to IsNotEmpty
  @IsOptional()
  @IsString()
  lname: string;

  // Email (Required and must be a valid email format)
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail()
  email: string;

  // Password (Required and must be a string)
  @IsNotEmpty({ message: 'Password is required.' })
  @IsString()
  password: string;

  // Role (Must be one of the values defined in the UserRole enum)
  // We use IsOptional because we set a default role in the UserService
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be a valid user role.' })
  role: UserRole;
}
