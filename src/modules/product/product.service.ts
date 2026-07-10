import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import slugify from 'slugify';
import { BrandRepo } from 'src/common/reposetories/brand-repo';
import { CategoryRepo } from 'src/common/reposetories/category-repo';
import { ProductRepo } from 'src/common/reposetories/product-repo';
import { SubCategoryRepo } from 'src/common/reposetories/subCategory-repo';
import { S3Service } from 'src/common/services/s3Service/s3.service';
import type { UserDocument } from '../users/entities/user.entity';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepo,
    private readonly categoryRepo: CategoryRepo,
    private readonly subCategoryRepo: SubCategoryRepo,
    private readonly brandRepo: BrandRepo,
    private readonly s3Service: S3Service
  ) { }


  async createProduct(user: UserDocument, body: CreateProductDto, gallery: Express.Multer.File[], mainImage: Express.Multer.File) {
    const { name, brandId, categoryId, subCategoryId, isActive, ratingAvg, discount,
      description, price, stock } = body;

    const isExist = await this.productRepo.findOne({ filter: { name } });
    if (isExist) {
      throw new BadRequestException('Product name already exists');

      //stock = stock == 0 ? 1 : stock;///
    }

    if (categoryId && !(await this.categoryRepo.findById(categoryId))) {
      throw new BadRequestException('Category not found');
    }

    if (subCategoryId && !(await this.subCategoryRepo.findById(subCategoryId))) {
      throw new BadRequestException('Subcategory not found');
    }

    if (brandId && !(await this.brandRepo.findById(brandId))) {
      throw new BadRequestException('Brand not found');
    }

    let uploadedGallery: string[] = [];
    if (gallery && gallery.length > 0) {
      uploadedGallery = await this.s3Service.uploadFiles({
        files: gallery,
        path: 'products/gallery',
      });
    }

    let uploadedmainImage: string | undefined;
    if (mainImage) {
      uploadedmainImage = await this.s3Service.uploadFile({
        file: mainImage,
        path: 'products/mainImage',
      });
    }

    let priceAfterDiscount: number | undefined;
    if (discount && discount > 0) {
      priceAfterDiscount = price - (price * (discount || 0 / 100));
    }
    const product = await this.productRepo.create({
      name,
      slug: slugify(name),
      brandId: Types.ObjectId.createFromHexString(brandId),
      categoryId: Types.ObjectId.createFromHexString(categoryId),
      subCategoryId: Types.ObjectId.createFromHexString(subCategoryId),
      mainImage: uploadedmainImage,
      description,
      gallery: uploadedGallery,
      price,
      ratingAvg,
      stock,
      priceAfterDiscount,
      createdBy: user._id,
    });

    console.log({ product });

    if (!product) {
      await this.s3Service.deleteManyFiles(uploadedGallery);
      await this.s3Service.deleteFile(uploadedmainImage as string);
      throw new InternalServerErrorException('Failed to create product');
    }
    return product
  }

  async getProduct(id: string) {
    const product = await this.productRepo.findOne({ filter: { _id: id } })
    return product
  }

  async getAllProducts(query: ProductQueryDto) {
    const { page, limit, skip } = query;

    const categories = await this.categoryRepo.paginate({
      limit, page, skip
    });
    return categories;
  }

  async updateProduct(id: Types.ObjectId, body: UpdateProductDto, user: UserDocument,
    files?: { gallery?: Express.Multer.File[], mainImage?: Express.Multer.File }) {

    let { name, discount, price, stock, description, priceAfterDiscount, subCategoryId, brandId, categoryId } = body
    let product = await this.productRepo.findOne({ filter: { _id: id } })
    if (!product) {
      throw new BadRequestException('product not found');
    }

    if (name && name != product.name) {
      product.name = name;
      product.slug = slugify(name);
    }



    if (subCategoryId && subCategoryId !== product.subCategoryId.toString()) {
      product.subCategoryId = Types.ObjectId.createFromHexString(subCategoryId);
    }

    if (brandId && brandId !== product.brandId.toString()) {
      product.brandId = Types.ObjectId.createFromHexString(brandId);
    }

    if (categoryId && categoryId !== product.categoryId.toString()) {
      product.categoryId = Types.ObjectId.createFromHexString(categoryId);
    }
    if (price && discount) {
      product.priceAfterDiscount = price - (price * (discount / 100));
    } else if (price) {
      product.priceAfterDiscount = price - (product.price * (product.discount / 100));
    } else if (discount) {
      product.priceAfterDiscount = product.price - (product.price * (discount / 100));
    }

    if (description) {
      product.description = description;
    }

    if (files?.gallery && files.gallery.length > 0) {
      await this.s3Service.deleteManyFiles(product.gallery);
      const uploadedGallery = await this.s3Service.uploadFiles({
        files: files?.gallery,
        path: 'products/gallery',
      });
      product.gallery = uploadedGallery;
    }

    if (files?.mainImage) {
      await this.s3Service.deleteFile(product.mainImage);
      const uploadedmainImage = await this.s3Service.uploadFile({
        file: files?.mainImage,
        path: 'products/mainImage',
      });
      product.mainImage = uploadedmainImage;
    }

    product.updatedBy = user._id;

    await product.save();

    return product;
  }
}

