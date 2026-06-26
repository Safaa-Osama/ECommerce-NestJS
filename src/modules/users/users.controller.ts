import {Controller, Get, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}


  @Get()
  getAllUsers(){
      return this._usersService.getAllUsers();
  }

  @Get('profile')
  getProfile(@Req() req:Request){
      return this._usersService.getProfile(req);
  }
}


