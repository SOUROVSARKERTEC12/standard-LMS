// src/course/course.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '../auth/auth.guard'; // 💡 Import the AuthGuard
import { AuthenticatedRequest } from 'src/common/interfaces/request.interface'; // 💡 Import the custom request interface
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/enum/roles.enum';

@UseGuards(AuthGuard, RolesGuard) // 💡 Protects all routes in this controller
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // -----------------------------------------------------
  // 1. CREATE COURSE (Protected & requires userId)
  // -----------------------------------------------------
  @Post()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  create(
    @Body() createCourseDto: CreateCourseDto,
    // Extract user ID from the JWT payload placed on the request by AuthGuard
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub; // The user ID is stored in the 'sub' field

    // Pass the userId to the service for FK assignment
    return this.courseService.create(userId, createCourseDto);
  }

  // -----------------------------------------------------
  // 2. READ ALL
  // -----------------------------------------------------
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  // -----------------------------------------------------
  // 3. READ ONE
  // -----------------------------------------------------
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    // 💡 Use ParseUUIDPipe to validate ID format
    // Ensure the service method receives a string (UUID)
    return this.courseService.findOne(id);
  }

  // -----------------------------------------------------
  // 4. UPDATE
  // -----------------------------------------------------
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    // You'd typically use the userId here to check if the user owns the course
    // @Req() req: AuthenticatedRequest,
  ) {
    // Ensure the service method receives a string (UUID)
    return this.courseService.update(id, updateCourseDto);
  }

  // -----------------------------------------------------
  // 5. DELETE
  // -----------------------------------------------------
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    // Ensure the service method receives a string (UUID)
    return this.courseService.remove(id);
  }
}
