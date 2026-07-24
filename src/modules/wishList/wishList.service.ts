import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import ProductRepo from 'src/common/reposetories/product-repo';
import { UserRepo } from 'src/common/reposetories/user-repo';
import WishListRepo from 'src/common/reposetories/wishList-repo';

@Injectable()
export class WishListService {
  constructor(
    private readonly productRepo: ProductRepo,
    private readonly wishListRepo: WishListRepo,
    private readonly userRepo: UserRepo

  ) { }


  async addProductToWishList(productId: Types.ObjectId) {
  //   const product = await this.productRepo.findOne({ _id: productId });
  //   if (!product) {
  //     throw new Error('Product not found');
  //   }
  //   const wishList = await this.wishListRepo.findOne({ createdBy: this.userRepo.findById() });
  //   if (!wishList) {
  //     const wishList = new this.wishListRepo({ createdBy: this.userRepo.findById(), products: [{ productId, quantity: 1, subTotal: product.price }] });
  //     await wishList.save();
  //   }
  //   wishList.products.push({ productId, quantity: 1, subTotal: product.price });
  //   await wishList.save();
  // }

}


}