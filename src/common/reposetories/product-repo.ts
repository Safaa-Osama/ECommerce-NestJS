 import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseRepo from './base-repo';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'src/modules/product/entities/product.entity';

@Injectable()
export class ProductRepo extends BaseRepo<ProductDocument> {
  constructor(@InjectModel(Product.name) protected readonly productModel: Model<ProductDocument>) {
    super(productModel);
  }
}

export default ProductRepo;
