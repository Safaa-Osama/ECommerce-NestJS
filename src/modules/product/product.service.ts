import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepo } from 'src/common/reposetories/product-repo';
import { BrandRepo } from 'src/common/reposetories/brand-repo';
import { CategoryRepo } from 'src/common/reposetories/category-repo';
import { SubCategoryRepo } from 'src/common/reposetories/subCategory-repo';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepo,
    private readonly categoryRepo: CategoryRepo,
    private readonly subCategoryRepo: SubCategoryRepo,
    private readonly brandRepo: BrandRepo
  ) { }


  async create(body: CreateProductDto) {
    const { name, brandId, categoryId, subCategoryId,
      description, gallery, price, stock, discountPercentage } = body;

    const isExist = await this.productRepo.findOne({ filter: { name } });
    if (isExist) {
      throw new BadRequestException('Product name already exists');
    }
    // stock ++ || no adding if stock is zero
    // stock == 0 ? stock = 1 : stock = stock;

    if (!(await this.categoryRepo.findById(categoryId))) {
      throw new BadRequestException('Category not found');
    }

    if (!(await this.subCategoryRepo.findById(subCategoryId))) {
      throw new BadRequestException('Subcategory not found');
    }

    if (!(await this.brandRepo.findById(brandId))) {
      throw new BadRequestException('Brand not found');
    }

    const product = await this.productRepo.create({
      name,
      brandId: new Types.ObjectId(brandId),
      categoryId: new Types.ObjectId(categoryId),
      subCategoryId: new Types.ObjectId(subCategoryId),
      description,
      gallery,
      price,
      stock,
      discount: discountPercentage
    });
    return product
  }


  async allProducts() {
    const products = await this.productRepo.find({})
    return products
  }
}

