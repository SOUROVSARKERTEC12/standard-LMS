// src/course/course.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    // 💡 Inject the Course repository
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  // -----------------------------------------------------
  // 1. CREATE
  // -----------------------------------------------------
  async create(
    userId: string,
    createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    // Create a new instance of the Course entity
    const newCourse = this.courseRepository.create({
      ...createCourseDto,
      // Assign the user ID from the authenticated user (JWT payload)
      userId: userId,
    });

    // Save the new course to the database
    return this.courseRepository.save(newCourse);
  }

  // -----------------------------------------------------
  // 2. READ ALL
  // -----------------------------------------------------
  async findAll(): Promise<Course[]> {
    // Find all courses, optionally including the author (user)
    return this.courseRepository.find({
      // Load the related user (author) data
      relations: ['user'],
    });
  }

  // -----------------------------------------------------
  // 3. READ ONE
  // -----------------------------------------------------
  async findOne(id: string): Promise<Course> {
    // Note: The ID should be a string (UUID)
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID "${id}" not found.`);
    }
    return course;
  }

  // -----------------------------------------------------
  // 4. UPDATE
  // -----------------------------------------------------
  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    // 1. Check if the course exists
    const course = await this.findOne(id);

    // 2. Apply updates from the DTO to the found course object
    this.courseRepository.merge(course, updateCourseDto);

    // 3. Save the merged entity back to the database
    return this.courseRepository.save(course);
  }

  // -----------------------------------------------------
  // 5. DELETE
  // -----------------------------------------------------
  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    // 1. Attempt to delete the course by ID
    const result = await this.courseRepository.delete(id);

    // 2. Check if a course was actually affected
    if (result.affected === 0) {
      // If affected is 0, the course ID didn't match any record
      throw new NotFoundException(`Course with ID "${id}" not found.`);
    }

    return { deleted: true, message: `Course ID ${id} successfully deleted.` };
  }
}
