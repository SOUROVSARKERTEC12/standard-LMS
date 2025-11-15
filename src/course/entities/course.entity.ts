import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, // 💡 For the Foreign Key relationship
  JoinColumn, // 💡 To define the column name for the FK
} from 'typeorm';
import { User } from '../../user/entity/user.entity'; // Import the User entity

// Define the available course levels for type safety
export enum CourseLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

@Entity('courses') // Use plural for table name
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Course Name (e.g., 'Introduction to NestJS')
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  // Course Description (Can be longer text)
  @Column({ type: 'text', nullable: false })
  description: string;

  // Course Level (using the defined enum for constraint)
  @Column({
    type: 'enum',
    enum: CourseLevel,
    default: CourseLevel.BEGINNER,
  })
  level: CourseLevel;

  // Price (Use decimal type for monetary values)
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  price: number;

  // -----------------------------------------------------
  // 💡 Foreign Key Relationship: User (Author/Creator)
  // -----------------------------------------------------

  // Foreign Key Column: Stores the UUID of the User
  @Column({ type: 'uuid' })
  userId: string;

  // Many-to-One Relationship: Many courses belong to one User
  // The 'user' property allows TypeORM to load the entire user object when needed
  @ManyToOne(() => User, (user) => user.courses, {
    // If the user is deleted, courses remain (set to null)
    onDelete: 'SET NULL',
    // Do not load the user automatically unless specified
    nullable: true,
  })
  // Defines the actual database column used for the foreign key
  @JoinColumn({ name: 'userId' })
  user: User;

  // Timestamps
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
