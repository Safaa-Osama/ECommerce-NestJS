import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import userModel from 'src/database/models/user.model';
import { UserRepo } from 'src/database/reposetories/user-repo';

@Module({
  imports: [userModel],
  controllers: [UsersController],
  providers: [UsersService,UserRepo],
  exports: [UsersService,UserRepo],
})
export class UsersModule {}

