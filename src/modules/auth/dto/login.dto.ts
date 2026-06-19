import { IsEmail, IsStrongPassword, Validate, validate } from 'class-validator';
import { matchText } from 'src/common/validation/custom-validation';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @Validate(matchText)
  password: string;
}
