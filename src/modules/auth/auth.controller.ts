import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, LoginDto, ConfirmDto, EmailDto, ResetPasswordDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

  ) { }

  @Get()
  getAuthPage() {
    return '<h1> Auth Page </h1>';
  }

  @Post('sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('sign-in')
  login(@Body() body: LoginDto) {
    return this.authService.signIn(body);
  }

  @Post('confirm-email')
  confirmEmail(@Body() body: ConfirmDto) {
    return this.authService.confirmEmail(body);
  }

  @Post('resend-otp')
  resendOtp(@Body() body: EmailDto) {
    return this.authService.resendOtp(body);
  }


  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }


}
