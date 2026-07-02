import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';


@Injectable()
export class CategoryService {
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all category`;
  }

}
