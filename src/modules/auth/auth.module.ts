import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import userModel from 'src/database/models/user.model';
import { UserRepo } from 'src/database/reposetories/user-repo';

@Module({
  imports: [userModel],
  controllers: [AuthController],
  providers: [AuthService, UserRepo],
  exports: [AuthService, UserRepo],
})
export class AuthModule {}
