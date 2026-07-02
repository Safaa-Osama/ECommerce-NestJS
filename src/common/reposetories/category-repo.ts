import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseRepo from './base-repo';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from 'src/modules/category/entities/category.entity';

@Injectable()
export class CategoryRepo extends BaseRepo<CategoryDocument> {
  constructor(@InjectModel(Category.name) protected readonly categoryModel: Model<CategoryDocument>) {
    super(categoryModel);
  }
}
