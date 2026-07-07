import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { UserRepo } from 'src/common/reposetories/user-repo';
import RedisService from 'src/common/services/redis/redis.service';
import { RedisModule } from 'src/common/services/redis/redisModule';
import { S3Service } from 'src/common/services/s3Service/s3.service';
import { TokenService } from 'src/common/services/token/tokenService';
import userModel from '../../modules/users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


@Global()
@Module({
  imports: [userModel,
    RedisModule,
    MulterModule.register()
  ],
  controllers: [AuthController],
  providers: [  
    AuthService,
    UserRepo,
    RedisService,
    TokenService,
    JwtService,
    S3Service
  ],
  exports: [],
})
export class AuthModule { }
