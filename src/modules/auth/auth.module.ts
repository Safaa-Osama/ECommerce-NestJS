import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import userModel from 'src/database/models/user.model';
import { UserRepo } from 'src/database/reposetories/user-repo';
import RedisService from 'src/common/services/redis/redis.service';
import { TokenService } from 'src/common/services/token/tokenService';
import { JwtService } from '@nestjs/jwt';


@Global()
@Module({
  imports: [userModel],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepo,
    RedisService,
    TokenService,
    JwtService
  ],
  exports: [],
})
export class AuthModule { }
