import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from './dto/subCategory.dto';
import type { UserDocument } from '../users/entities/user.entity';
import { SubCategoryRepo } from 'src/common/reposetories/subCategory-repo';
import { CategoryRepo } from 'src/common/reposetories/category-repo';
import { S3Service } from 'src/common/services/s3Service/s3.service';
import slugify from 'slugify';
import { Types } from 'mongoose';


@Injectable()
export class SubCategoryService {
  constructor(
    private readonly categoryRepo: CategoryRepo,
    private readonly subCategoryRepo: SubCategoryRepo,
    private readonly s3Service: S3Service,

  ) { }


  async createSubCategory(body: CreateSubCategoryDto, logo: Express.Multer.File, user: UserDocument) {
    const { name, isActive } = body;


    if (await this.subCategoryRepo.findOne({ filter: { name } })) {
      throw new BadRequestException("Sub Category name already exist")
    }

    const category = await this.categoryRepo.findOne({ filter: { _id: body.category } })

    if (!category) {
      throw new BadRequestException("Category not found")
    }

    let uploadedImage: string | undefined;
    if (logo) {
      uploadedImage = await this.s3Service.uploadFile({
        file: logo,
        path: "category/sub-category",
      });
    }
    const subCategory = await this.subCategoryRepo.create({
      name,
      isActive,
      slug: slugify(name),
      logo: uploadedImage,
      category: category._id,
      createdBy: user._id
    })

    if (!subCategory) {
      await this.s3Service.deleteFile(uploadedImage as string)
      throw new BadRequestException("Failed to create sub-category")
    }
    return subCategory
  }

  allSubCategories() {
    return this.subCategoryRepo.find({})
  }

  updateSubCategory(id: string, body: UpdateSubCategoryDto, logo: Express.Multer.File, user: UserDocument) {
    const { } = body
  }
}
