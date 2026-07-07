import { Module } from '@nestjs/common';
import { CategoryRepo } from 'src/common/reposetories/category-repo';
import { SubCategoryRepo } from 'src/common/reposetories/subCategory-repo';
import { S3Service } from 'src/common/services/s3Service/s3.service';
import categoryModel from '../category/entities/category.entity';
import userModel from '../users/entities/user.entity';
import subCategoryModel from './entities/sub-category.entity';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';

@Module({
  imports: [subCategoryModel, userModel, categoryModel],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, SubCategoryRepo,
    CategoryRepo,
    S3Service
  ],
})
export class SubCategoryModule { }
