 import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WishList, WishListDocument } from 'src/modules/wishList/entities/wishList.entity';
import BaseRepo from './base-repo';

@Injectable()
class WishListRepo extends BaseRepo<WishListDocument> {
  constructor(@InjectModel(WishList.name) protected readonly WishListModel: Model<WishListDocument>) {
    super(WishListModel);
  }
}
export default WishListRepo;
