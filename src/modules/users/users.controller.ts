import { Controller, Get, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { TokenEnum } from 'src/common/enums/tokenEnum';
import type { IRequest } from 'src/utilis/types/request.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('profile')
  @SetMetadata('tokenType', TokenEnum.accessToken)
  @UseGuards(AuthGuard)
  getProfile(@Req() req:IRequest){
      return this.usersService.getProfile(req);
  }
  
}


