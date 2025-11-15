import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

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
}
