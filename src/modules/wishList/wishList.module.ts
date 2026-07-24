import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BrandRepo } from 'src/common/reposetories/brand-repo';
import { CategoryRepo } from 'src/common/reposetories/category-repo';
import ProductRepo from 'src/common/reposetories/product-repo';
import { SubCategoryRepo } from 'src/common/reposetories/subCategory-repo';
import { UserRepo } from 'src/common/reposetories/user-repo';
import WishListRepo from 'src/common/reposetories/wishList-repo';
import RedisService from 'src/common/services/redis/redis.service';
import { S3Service } from 'src/common/services/s3Service/s3.service';
import { TokenService } from 'src/common/services/token/tokenService';
import { brandModel } from '../brand/entities/brand.entity';
import categoryModel from '../category/entities/category.entity';
import productModel from '../product/entities/product.entity';
import subCategoryModel from '../sub-category/entities/sub-category.entity';
import userModel from '../users/entities/user.entity';
import { WishListController } from './wishList.controller';
import { WishListService } from './wishList.service';
import { WishListModel } from './entities/wishList.entity';

@Module({
  imports: [userModel, productModel, categoryModel, subCategoryModel, brandModel, WishListModel],
  controllers: [WishListController],
  providers: [
    WishListService,
    WishListRepo,
    TokenService,
    JwtService,
    UserRepo,
    RedisService,
    ProductRepo,
    S3Service,
    CategoryRepo, SubCategoryRepo, BrandRepo
  ],
})
export class WishListModule { }
