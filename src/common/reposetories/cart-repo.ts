 import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseRepo from './base-repo';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from 'src/modules/cart/entities/cart.entity';

@Injectable()
class CartRepo extends BaseRepo<CartDocument> {
  constructor(@InjectModel(Cart.name) protected readonly cartModel: Model<CartDocument>) {
    super(cartModel);
  }
}
export default CartRepo;
