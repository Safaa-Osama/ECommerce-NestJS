import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepo } from 'src/common/reposetories/user-repo';
import RedisService from 'src/common/services/redis/redis.service';
import { TokenService } from 'src/common/services/token/tokenService';
import userModel from '../../modules/users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


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
