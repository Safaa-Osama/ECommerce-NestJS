import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CategoryRepo } from 'src/common/reposetories/category-repo';
import { UserRepo } from 'src/common/reposetories/user-repo';
import { S3Service } from 'src/common/services/s3Service/s3.service';
import { TokenService } from 'src/common/services/token/tokenService';
import userModel from '../users/entities/user.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import categoryModel from './entities/category.entity';
import RedisService from 'src/common/services/redis/redis.service';

@Global()
@Module({
  imports: [categoryModel,userModel],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepo,
    UserRepo,
    TokenService,
    S3Service,
    JwtService,
    RedisService
  ],
})
export class CategoryModule { }
