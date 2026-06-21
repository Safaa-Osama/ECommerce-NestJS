import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService
  
  ) {}

  @Get()
  getAuthPage() {
    return '<h1> Auth Page </h1>';
  }

  @Post('sign-up')
  signUp(@Body()
   body: SignUpDto) {
    return this._authService.signUp(body);
  }

  @Post('sign-in')
  login(@Body() body: LoginDto) {
    return this._authService.login(body);
  }
}
