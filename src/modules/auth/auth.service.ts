import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/database/models/user.model';
import { Model } from 'mongoose';
import { hash } from 'src/common/security/hash';
import { encryptValue } from 'src/common/security/encript';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private _userModel: Model<User>) {}

  async signUp(body: SignUpDto) {
    const { userName, role, gender, email, age, password,cPassword, profilePic,phone } = body;
    const emailExist = await this._userModel.findOne({ email });

    if (emailExist) {
      throw new BadRequestException('email already exist');
    }

    if(password !== cPassword) {
      throw new BadRequestException('password and confirm password does not match');
    }
    if (profilePic) {
      
    }
    const user = await this._userModel.create({
      userName,
      role,
      gender,
      email,
      age,
      password: hash({ text: password }),
      phone: encryptValue({ value: phone }),
      profilePic
    });

    if (!user) {
      //delete profile pic 
      throw new InternalServerErrorException('Something went wrong');
    }
    
    return user;
  }

  login(body: LoginDto) {
    const { email, password }: LoginDto = body;
    return { email, password };
  }
}
