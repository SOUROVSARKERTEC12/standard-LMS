import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  registerUser(registerUserDto: RegisterDto) {
    console.log('RegsterDto', registerUserDto);
    // Logic for user register
    /**
     * 1. check if email already exists
     * 2. hash the password using argon
     * 3. store the user data into db
     * 4. generate jwt token
     * 5. send token in response
     */

    return this.userService.createUser();
  }
}
