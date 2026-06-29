import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
  Min,
  ValidateIf,
} from 'class-validator';
import { IsMatch } from 'src/common/pipes/user.pipe';
import { GenderEnum, RoleEnum } from 'src/common/enums/userEnum';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export class ConfirmDto {
  @IsEmail()
  email: string;

  @IsNumber()
  otp: number;
}

export class SignUpDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(3,25)
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

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsString()
  @IsPhoneNumber()
  phone: string;
}
