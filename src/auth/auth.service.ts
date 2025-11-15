import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.user.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterDto) {
    // console.log('RegsterDto', registerUserDto);
    const hashedPassword = await argon2.hash(registerUserDto.password);

    // console.log('hashPassword', hashedPassword);
    // Logic for user register
    /**
     * 1. check if email already exists
     * 2. hash the password using argon
     * 3. store the user data into db
     * 4. generate jwt token
     * 5. send token in response
     */

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hashedPassword,
    });

    const payload = {
      sub: user.id,
      // username: `${user.fname} ${user.lname}`,
      // email: user.email,
      // role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async loginUser(
    loginUserDto: LoginDto,
  ): Promise<{ user: Omit<User, 'password'>; accessToken: string }> {

    // console.log("login cred", loginUserDto)
    // 1. Find the user by email
    const user = await this.userService.findByEmailWithPassword(
      loginUserDto.email,
    );

    // 2. Check if the user exists
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // 3. Verify the password hash using Argon2
    const passwordMatch = await argon2.verify(
      user.password,
      loginUserDto.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // 4. Generate JWT payload
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      // Optional: Add full name
      username: `${user.fname} ${user.lname}`,
    };

    // 5. Generate Access Token
    const accessToken = await this.jwtService.signAsync(payload);

    // 6. Prepare and return the response (user data without password + token)
    const { password, ...rest } = user;

    return {
      user: rest,
      accessToken,
    };
  }
}
