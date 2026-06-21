import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from 'src/modules/auth/dto/signUp.dto';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { GenderEnum, RoleEnum } from 'src/common/enums/userEnum';

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

  @IsEnum(RoleEnum)
  @IsOptional()
  role: RoleEnum;

  @IsEnum(GenderEnum)
  @IsOptional()
  gender: GenderEnum;

  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
