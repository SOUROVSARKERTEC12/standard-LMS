// src/course/dto/create-course.dto.ts

import { IsString, IsNotEmpty, IsEnum, IsNumber, Min } from 'class-validator';
import { CourseLevel } from '../entities/course.entity';

export class CreateCourseDto {
  // Name: Required string
  @IsNotEmpty({ message: 'Course name is required.' })
  @IsString()
  name: string;

  // Description: Required string (text)
  @IsNotEmpty({ message: 'Course description is required.' })
  @IsString()
  description: string;

  // Level: Must be a valid value from the CourseLevel enum
  @IsNotEmpty({ message: 'Course level is required.' })
  @IsEnum(CourseLevel, { message: 'Invalid course level provided.' })
  level: CourseLevel;

  // Price: Must be a non-negative number
  @IsNumber()
  @Min(0, { message: 'Price cannot be negative.' })
  price: number;

  // Note: userId (the creator) is typically pulled from the JWT payload
  // in the Controller, not sent by the client in the DTO body.
}
