import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/subCategory.dto';

@Injectable()
export class SubCategoryService {
  create(createSubCategoryDto: CreateSubCategoryDto) {
    return 'This action adds a new subCategory';
  }

  findAll() {
    return `This action returns all subCategory`;
  }
}
