import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from 'src/modules/auth/dto/signUp.dto';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateUserDto extends PartialType(SignUpDto) {
  @IsString()
  @IsOptional()
  userName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  profilePic: string;

  @IsEnum(['user', 'admin'])
  @IsOptional()
  role: string;

  @IsEnum(['male', 'female'])
  @IsOptional()
  gender: string;

  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
