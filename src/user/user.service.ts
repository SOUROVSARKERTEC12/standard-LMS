import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(registerUserDto: RegisterDto) {
    const newUser = this.usersRepository.create({
      ...registerUserDto,
      // password: hashedPassword, // Use hashed password
    });

    try {
      // Attempt to save the new user to the database
      return await this.usersRepository.save(newUser);
    } catch (error) {
      // console.log(error);
      if (error instanceof QueryFailedError) {
        const rawError = error as { errno?: number };
        const DUPLICATE_KEY_CODE: number = 1062;
        if (rawError.errno === DUPLICATE_KEY_CODE) {
          throw new BadRequestException('User with this email already exists.');
        }
      }
      throw new InternalServerErrorException(
        'A database error occurred during user creation.',
      );
    }
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: [
        'id',
        'fname',
        'lname',
        'email',
        'role',
        'password',
        'createdAt',
        'updatedAt',
      ],
    });
  }
  async findByUserId(id: string): Promise<Omit<User, 'password'> | null> {
    // findOneBy is cleaner for simple primary key lookups
    // Because we DO NOT explicitly include 'password' in the select array,
    // TypeORM honors the @Column({ select: false }) decorator on the User entity.
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      return null;
    }

    // Use object destructuring to safely omit the password property
    // before returning the object.
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
