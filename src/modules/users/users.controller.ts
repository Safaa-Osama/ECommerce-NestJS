import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import type { IRequest } from 'src/utilis/types/request.type';
import { auth } from 'src/common/decorator/auth.decorator';

@Controller('users')
@auth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('profile')
  getProfile(@Req() req: IRequest) {
    return this.usersService.getProfile(req);
  }

}


