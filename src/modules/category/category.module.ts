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
import { BrandRepo } from 'src/common/reposetories/brand-repo';
import {brandModel} from '../brand/entities/brand.entity';

@Global()
@Module({
  imports: [categoryModel,userModel,brandModel],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepo,
    UserRepo,
    TokenService,
    S3Service,
    JwtService,
    RedisService,
    BrandRepo
  ],
})
export class CategoryModule { }
