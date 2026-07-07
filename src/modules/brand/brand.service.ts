import { BadRequestException, Injectable } from '@nestjs/common';
import { BrandRepo } from 'src/common/reposetories/brand-repo';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import type { UserDocument } from '../users/entities/user.entity';
import { S3Service } from 'src/common/services/s3Service/s3.service';
import slugify from 'slugify';

@Injectable()
export class BrandService {

  constructor(
    private readonly brandRepo: BrandRepo,
    private readonly s3Service: S3Service,

  ) { }


  async createBrand(body: CreateBrandDto, logo: Express.Multer.File, user: UserDocument) {
    const { name, isActive } = body;

    if (await this.brandRepo.findOne({ filter: { name } })) {
      throw new BadRequestException("Category name already exist")
    }

    let uploadedImage: string | undefined;
    if (logo) {
      uploadedImage = await this.s3Service.uploadFile({
        file: logo,
        path: "users",
      });
    }

    const brand = await this.brandRepo.create({
      name,
      isActive,
      slug: slugify(name),
      logo: uploadedImage,
      createdBy:user._id
    });
    if (!brand) {
      await this.s3Service.deleteFile(uploadedImage as string)
      throw new BadRequestException("Failed to create brand")
    }
    return brand;
  }

  async allBrands() {
    const brands = await this.brandRepo.find({ filter: { isActive: true } });
    return brands;
  }

  async updateBrand(id: string, body: UpdateBrandDto) {

  }

  async deleteBrand(id: string) {

  }

}