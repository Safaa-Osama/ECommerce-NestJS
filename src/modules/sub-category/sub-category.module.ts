import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import subCategoryModel from './entities/sub-category.entity';
import { SubCategoryRepo } from 'src/common/reposetories/subCategory-repo';

@Module({
  imports: [subCategoryModel],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, SubCategoryRepo],
})
export class SubCategoryModule { }
