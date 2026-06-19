import { IsEnum, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, Min, ValidateIf } from 'class-validator';
import { LoginDto } from './login.dto';
import { IsMatch } from 'src/common/validation/custom-validation';

export class SignUpDto extends LoginDto {
  @IsString()
  @Length(3.1)
  userName: string;

  @IsMatch(['password'])
  @ValidateIf((obj) => obj.password)
  cPassword: string;

  @IsNumber()
  @Min(18)
  age: number;

  @IsString()
  @IsOptional()
  profilePic: string;

  @IsEnum(['user', 'admin'])
  role: string;

  @IsEnum(['male', 'female'])
  gender: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;
}
