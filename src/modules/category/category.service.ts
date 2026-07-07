import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { CategoryRepo } from 'src/common/reposetories/category-repo';
import { S3Service } from 'src/common/services/s3Service/s3.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import type { UserDocument } from '../users/entities/user.entity';
import { Types } from 'mongoose';


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

  
  
 

 async updateCategory(id: string, body: UpdateCategoryDto, user: UserDocument, logo: Express.Multer.File) {
     const { name, isActive } = body;
     const categoty = await this.categoryRepo.findOne({ filter: { _id: id } });
     if (!categoty) {
       throw new BadRequestException("categoty not found");
     }
 
     if (name) {
       if (await this.categoryRepo.findOne({ filter: { name, _id: { $ne: id } } })) {
         throw new ConflictException("categoty name already exist");
       }
       categoty.name = name;
       categoty.slug = slugify(name);
     }
 
     if (logo) {
       const uploadedImage = await this.s3Service.uploadFile({
         file: logo,
         path: "categoty",
       });
       if (categoty.logo) {
         await this.s3Service.deleteFile(categoty.logo as string);
       }
       categoty.logo = uploadedImage;
     }
 
     if (isActive !== undefined) {
       categoty.isActive = isActive;
     }
 
     categoty.updatedBy = user._id;
     await categoty.save();
     return categoty;
   }

}
