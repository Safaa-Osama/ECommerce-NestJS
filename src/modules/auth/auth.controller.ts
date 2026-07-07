import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterEnum, StoreEnum } from 'src/common/enums/multerEnum';
import { multer_cloud } from 'src/common/interceptor/multer';
import { AuthService } from './auth.service';
import { ConfirmDto, EmailDto, LoginDto, ResetPasswordDto, SignUpDto } from './dto/auth.dto';


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
  @UseInterceptors(FileInterceptor('profilePic', multer_cloud({
    storeType: StoreEnum.memory,
    customType: MulterEnum.image,
    maxFileSize: 5 * 1024 * 1024
  }))
  )
  signUp(@Body() body: SignUpDto, @UploadedFile() file: Express.Multer.File) {
    return this.authService.signUp(body, file);
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
