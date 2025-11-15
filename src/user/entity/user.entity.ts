import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enum/roles.enum';

@Entity('user')
export class User {
  // 1. UUID Primary Key (uuidv4)
  @PrimaryGeneratedColumn('uuid')
  id: string; // TypeORM uses 'string' for UUID columns

  // 2. First Name (fname)
  @Column({ type: 'varchar', length: 50, nullable: true })
  fname: string;

  // 3. Last Name (lname)
  @Column({ type: 'varchar', length: 50 })
  lname: string;

  // 4. Email (Must be unique for login)
  @Column({ type: 'varchar', unique: true })
  email: string;

  // 5. Password (Stored as a hash, never plain text)
  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
    nullable: false,
  })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
