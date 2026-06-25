import { Body, Controller, Get, ParseFilePipe, Post, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

  ) { }

  @Get()
  getAuthPage() {
    return '<h1> Auth Page </h1>';
  }

 
// @Post('file')
// uploadFileAndPassValidation(
//   @Body() body: SignUpDto,
//   @UploadedFile(
//     new ParseFilePipe()
//   )
//   file: Express.Multer.File,
// ) {
//   return {
//     body,
//     file: file.buffer.toString(),
//   };
// }

@Post('sign-up')
signUp(@Body() body: SignUpDto) {
  return this.authService.signUp(body) ;
}

@Post('sign-in')
login(@Body() body: LoginDto) {
  return this.authService.login(body) ;
}

}
