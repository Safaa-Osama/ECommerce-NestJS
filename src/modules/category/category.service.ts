import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryRepo } from 'src/common/reposetories/category-repo';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import slugify from 'slugify';


@Injectable()
export class CategoryService {

  constructor(
    private readonly categoryRepo: CategoryRepo,
  ) { }

  async create(body: CreateCategoryDto) {
    const { name, isActive } = body;
    const isExist = await this.categoryRepo.findOne({ filter: { name } })
    if (isExist) {
      throw new BadRequestException("Category name already exist")
    }
    const image = ' '
    const category = await this.categoryRepo.create({
      name,
      isActive,
      slug: slugify(name, { lower: true, trim: true }),
      image: image
    });
    if (!category) {
      //delete image
      //throw bad exception
    }
    return category;
  }

  async allCategories() {
    const categories = await this.categoryRepo.find({});
    return categories;
  }

  async updateCategory(id: string, body: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne({ filter: { _id: id } })

    if (!category) {
      throw new BadRequestException("Category not found");
    }

    return category;
  }

}
