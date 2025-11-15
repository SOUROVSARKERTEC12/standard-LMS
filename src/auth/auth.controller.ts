import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.user.dto';
import { LoginDto } from './dto/login.user.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  //   authService: AuthService;
  //   constructor(authService: AuthService) {
  //     this.authService = authService;
  //   }
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterDto) {
    const result = this.authService.registerUser(registerUserDto);
    return result;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginDto) {
    // 💡 Inject LoginUserDto
    // Call the service method to handle authentication and token generation
    const result = await this.authService.loginUser(loginUserDto);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const userId = req.user.sub;
    return this.userService.findByUserId(userId);
  }
}
