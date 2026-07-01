import { Controller, Get } from '@nestjs/common';
import { auth } from 'src/common/decorator/auth.decorator';
import { User } from 'src/common/decorator/user.decorator';
import type { UserDocument } from 'src/database/models/user.model';
import { UsersService } from './users.service';

@Controller('users')
@auth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('profile')
  getProfile(@User() user: UserDocument) {
    return this.usersService.getProfile(user);
  }

}


