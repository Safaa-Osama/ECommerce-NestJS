 import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseRepo from './base-repo';
import { InjectModel } from '@nestjs/mongoose';
import { Brand, BrandDocument } from 'src/modules/brand/entities/brand.entity';

@Injectable()
export class BrandRepo extends BaseRepo<BrandDocument> {
  constructor(@InjectModel(Brand.name) protected readonly brandModel: Model<BrandDocument>) {
    super(brandModel);
  }
}
