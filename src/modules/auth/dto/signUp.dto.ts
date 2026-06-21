import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Min,
  ValidateIf,
} from 'class-validator';
import { LoginDto } from './login.dto';
import { IsMatch } from 'src/common/pipes/user.pipe';
import { GenderEnum, RoleEnum } from 'src/common/enums/userEnum';

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
