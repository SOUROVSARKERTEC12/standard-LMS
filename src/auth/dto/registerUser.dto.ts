import { UserRole } from 'src/user/enum/roles.enum';

export class RegisterDto {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: UserRole;
}
