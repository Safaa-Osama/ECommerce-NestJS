import { BadRequestException, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { CategoryRepo } from 'src/common/reposetories/category-repo';
import { S3Service } from 'src/common/services/s3Service/s3.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import type { UserDocument } from '../users/entities/user.entity';


@Injectable()
export class CategoryService {

  constructor(
    private readonly categoryRepo: CategoryRepo,
    private readonly s3Service: S3Service,

  ) { }

  async createCategory(body: CreateCategoryDto, logo: Express.Multer.File,user:UserDocument) {
    const { name, isActive } = body;

    if (await this.categoryRepo.findOne({ filter: { name } })) {
      throw new BadRequestException("Category name already exist")
    }

    let uploadedImage: string | undefined;
    if (logo) {
      uploadedImage = await this.s3Service.uploadFile({
        file: logo,
        path: "users",
      });
    }

    const category = await this.categoryRepo.create({
      name,
      isActive,
      slug: slugify(name),
      logo: uploadedImage,
      createdBy:user._id
    })
    
    if (!category) {
      await this.s3Service.deleteFile(uploadedImage as string)
      throw new BadRequestException("Failed to create category")
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
