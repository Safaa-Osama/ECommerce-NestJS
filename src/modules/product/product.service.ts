import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { BrandRepo } from 'src/common/reposetories/brand-repo';
import { CategoryRepo } from 'src/common/reposetories/category-repo';
import { ProductRepo } from 'src/common/reposetories/product-repo';
import { SubCategoryRepo } from 'src/common/reposetories/subCategory-repo';
import { S3Service } from 'src/common/services/s3Service/s3.service';
import { CreateProductDto } from './dto/product.dto';
import type { UserDocument } from '../users/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepo,
    private readonly categoryRepo: CategoryRepo,
    private readonly subCategoryRepo: SubCategoryRepo,
    private readonly brandRepo: BrandRepo,
    private readonly s3Service: S3Service
  ) { }


  async createProduct(body: CreateProductDto, files: Express.Multer.File[], mainImage: Express.Multer.File, user:UserDocument) {
    const { name, brandId, categoryId, subCategoryId, isActive,ratingAvg,
      description, price, stock, priceAfterDiscount } = body;

    const isExist = await this.productRepo.findOne({ filter: { name } });
    if (isExist) {
      throw new BadRequestException('Product name already exists');

      //stock = stock == 0 ? 1 : stock;///
    }
    if (!(await this.categoryRepo.findById(categoryId))) {
      throw new BadRequestException('Category not found');
    }

    if (!(await this.subCategoryRepo.findById(subCategoryId))) {
      throw new BadRequestException('Subcategory not found');
    }

    if (!(await this.brandRepo.findById(brandId))) {
      throw new BadRequestException('Brand not found');
    }

    let uploadedGallery: string[] = [];
    if (files && files.length > 0) {
      uploadedGallery = await this.s3Service.uploadFiles({
        files,
        path: 'products/gallery',
      });
    }

    let uploadedmainImage: string | undefined;
    if (mainImage) {
      uploadedmainImage = await this.s3Service.uploadFile({
        file:mainImage,
        path: 'products/mainImage',
      });
    }



    const product = await this.productRepo.create({
      name,
      brandId: Types.ObjectId.createFromHexString(brandId),
      categoryId: Types.ObjectId.createFromHexString(categoryId),
      subCategoryId: Types.ObjectId.createFromHexString(subCategoryId),
      mainImage:uploadedmainImage,
      description,
      gallery: uploadedGallery,
      price,
      ratingAvg,
      stock,
      priceAfterDiscount
    });

    if (!product) {
      await this.s3Service.deleteManyFiles(uploadedGallery);
      await this.s3Service.deleteFile(uploadedmainImage as string);
      throw new InternalServerErrorException('Failed to create product');
    }
    return product
  }


  async allProducts() {
    const products = await this.productRepo.find({})
    return products
  }
}

