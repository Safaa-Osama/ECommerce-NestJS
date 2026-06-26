import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import userModel from 'src/database/models/user.model';
import { UserRepo } from 'src/database/reposetories/user-repo';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/services/token/tokenService';
import RedisService from 'src/common/services/redis/redis.service';

@Module({
  imports: [userModel],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepo,
    TokenService,
    JwtService,
    RedisService,
  ],
  exports: [
    UsersService,
    UserRepo
  ],
})
export class UsersModule {}