import { Global, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import categoryModel from './entities/category.entity';
import { CategoryRepo } from 'src/common/reposetories/category-repo';

@Global()
@Module({
  imports: [categoryModel],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepo],
})
export class CategoryModule { }
