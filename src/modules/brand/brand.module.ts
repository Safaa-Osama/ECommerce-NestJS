import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandRepo } from 'src/common/reposetories/brand-repo';
import { brandModel } from './entities/brand.entity';
import { UserRepo } from 'src/common/reposetories/user-repo';
import { TokenService } from 'src/common/services/token/tokenService';
import { JwtService } from '@nestjs/jwt';
import userModel from '../users/entities/user.entity';
import RedisService from 'src/common/services/redis/redis.service';
import { S3Service } from 'src/common/services/s3Service/s3.service';

@Module({
  imports: [brandModel, userModel],
  controllers: [BrandController],
  providers: [BrandService, BrandRepo,
    UserRepo,
    TokenService,
    JwtService,
    RedisService,
    S3Service
  ],
})
export class BrandModule { }
