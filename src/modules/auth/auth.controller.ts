import { Body, Controller, Get, ParseFilePipe, Post, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, LoginDto, ConfirmDto } from './dto/signUp.dto';


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

}
