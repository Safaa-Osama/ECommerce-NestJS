import {Controller, Get, Req, SetMetadata, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { TokenEnum } from 'src/common/enums/tokenEnum';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}


  @Get()
  getAllUsers(){
      return this._usersService.getAllUsers();
  }

  @Get('profile')
  @SetMetadata('tokenType', TokenEnum.accessToken)
  @UseGuards(AuthGuard)
  getProfile(@Req() req:Request){
      return this._usersService.getProfile(req);
  }
}


