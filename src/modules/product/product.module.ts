import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepo } from 'src/common/reposetories/product-repo';
import { CategoryRepo } from 'src/common/reposetories/category-repo';
import { SubCategoryRepo } from 'src/common/reposetories/subCategory-repo';
import { BrandRepo } from 'src/common/reposetories/brand-repo';
import productModel from './entities/product.entity';
import categoryModel from '../category/entities/category.entity';
import subCategoryModel from '../sub-category/entities/sub-category.entity';
import { brandModel } from '../brand/entities/brand.entity';
import { S3Service } from 'src/common/services/s3Service/s3.service';
import userModel from '../users/entities/user.entity';

@Module({
  imports: [
    userModel,
    productModel,
    categoryModel,
    subCategoryModel,
    brandModel,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepo,
    CategoryRepo,
    BrandRepo,
    SubCategoryRepo,
    S3Service
  ],
})
export class ProductModule { }
