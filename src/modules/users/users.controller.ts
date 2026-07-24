import { Controller, Get, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { auth } from 'src/common/decorator/auth.decorator';
import { User } from 'src/common/decorator/user.decorator';
import { MulterEnum, StoreEnum } from 'src/common/enums/multerEnum';
import { multer_cloud } from 'src/common/interceptor/multer';
import { FileValidationPipe } from 'src/common/pipes/multer.pipe';
import type { UserDocument } from './entities/user.entity';
import { UsersService } from './users.service';




@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @auth({})   
  @Get('profile')
  getProfile(@User() user: UserDocument) {
    return this.usersService.getProfile(user);
  }

  @auth({})
  @UsePipes(FileValidationPipe)
  @UseInterceptors(FileInterceptor('profilePic', {
    storage: multer_cloud({
      storeType: StoreEnum.memory,
      customType: MulterEnum.image,
      maxFileSize: 5 * 1024 * 1024,
    }),
  })
  )
  @Post('upload')
  upload(@User() user: UserDocument, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.upload(user, file);
  }

}


