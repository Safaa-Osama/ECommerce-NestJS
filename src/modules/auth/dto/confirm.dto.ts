import { IsEmail, IsNumber, IsStrongPassword, Validate, validate } from 'class-validator';
import { matchText } from 'src/common/pipes/user.pipe';

export class ConfirmDto {
  @IsEmail()
  email: string;

  @IsNumber()
  otp: number;
}
