import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
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
      throw new ConflictException("Brand name already exist")
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

  async updateBrand(id: string, body: UpdateBrandDto, user: UserDocument, logo?: Express.Multer.File) {
    const { name, isActive } = body;
    const brand = await this.brandRepo.findOne({ filter: { _id: id } });
    if (!brand) {
      throw new BadRequestException("Brand not found");
    }

    if (name) {
      if (await this.brandRepo.findOne({ filter: { name, _id: { $ne: id } } })) {
        throw new ConflictException("Brand name already exist");
      }
      brand.name = name;
      brand.slug = slugify(name);
    }

    if (logo) {
      const uploadedImage = await this.s3Service.uploadFile({
        file: logo,
        path: "brand",
      });
      if (brand.logo) {
        await this.s3Service.deleteFile(brand.logo as string);
      }
      brand.logo = uploadedImage;
    }

    if (isActive !== undefined) {
      brand.isActive = isActive;
    }

    brand.updatedBy = user._id;
    await brand.save();
    return brand;
  }

  async deleteBrand(id: string) {

  }

}