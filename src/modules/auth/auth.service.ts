import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor() {}

  signUp(body: SignUpDto) {
    const {
      userName,
      role,
      gender,
      email,
      age,
      password,
      cPassword,
      phone,
    }: SignUpDto = body;
  }

  login(body: LoginDto) {
    const { email, password }: LoginDto = body;
  }
}
