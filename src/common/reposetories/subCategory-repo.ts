 import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseRepo from './base-repo';
import { InjectModel } from '@nestjs/mongoose';
import { SubCategory, SubCategoryDocument } from 'src/modules/sub-category/entities/sub-category.entity';

@Injectable()
export class SubCategoryRepo extends BaseRepo<SubCategoryDocument> {
  constructor(@InjectModel(SubCategory.name) protected readonly subCategoryModel: Model<SubCategoryDocument>) {
    super(subCategoryModel);
  }
}
