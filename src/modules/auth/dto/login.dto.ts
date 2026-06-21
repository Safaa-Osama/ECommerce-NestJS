import { IsEmail, IsStrongPassword, Validate, validate } from 'class-validator';
import { matchText } from 'src/common/pipes/user.pipe';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
