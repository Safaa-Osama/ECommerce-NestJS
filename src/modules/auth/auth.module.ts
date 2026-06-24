import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import userModel from 'src/database/models/user.model';
import { UserRepo } from 'src/database/reposetories/user-repo';
import { RedisModule } from 'src/common/services/redis/redisModule';
import RedisService from 'src/common/services/redis/redis.service';

@Global()
@Module({
  imports: [
    userModel,
    
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepo,
    RedisService
  ],
  exports: [AuthService,
    UserRepo,

  ],
})
export class AuthModule { }
