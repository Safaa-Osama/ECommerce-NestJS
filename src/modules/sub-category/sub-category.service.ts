import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from './dto/subCategory.dto';

@Injectable()
export class SubCategoryService {
  create(body: CreateSubCategoryDto) {
    return 'This action adds a new subCategory';
  }

  allSubCategories() {
    return `This action returns all subCategory`;
  }

  updateSubCategory(id: string, body: UpdateSubCategoryDto) {
    return `This action updates subCategory`;
  }
}
