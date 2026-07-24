import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import ProductRepo from 'src/common/reposetories/product-repo';
import { UserRepo } from 'src/common/reposetories/user-repo';
import WishListRepo from 'src/common/reposetories/wishList-repo';
import { UserDocument } from '../users/entities/user.entity';

@Injectable()
export class WishListService {
  constructor(
    private readonly productRepo: ProductRepo,
    private readonly wishListRepo: WishListRepo,
    private readonly userRepo: UserRepo

  ) { }


  async toggleWishList(productId: Types.ObjectId, user: UserDocument) {
    const product = await this.productRepo.findOne({
      filter: { _id: productId },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    let wishList = await this.wishListRepo.findOne({
      filter: { createdBy: user._id },
    });

    if (!wishList) {
      return await this.wishListRepo.create({
        createdBy: user._id,
        products: [
          {
            productId,
            quantity: 1
          },
        ],
      });
    }

    const productExist = await this.wishListRepo.findOne({
      filter: { createdBy: user._id, 'products.productId': productId },
    })

    let isExist: Boolean
    if (productExist) {
      await this.wishListRepo.findOneAndUpdate({
        filter: { createdBy: user._id, 'products.productId': productId },
        update: {
          $pull: {
            products: { productId },
          },
        },
        options: { new: true },
      })
      isExist = false
    } else {
      await this.wishListRepo.findOneAndUpdate({
        filter: { createdBy: user._id },
        update: {
          $push: {
            products: {
              productId,
              quantity: 1
            },
          },
        },
        options: { new: true },
      });
      isExist = true
    }

    return isExist == false ? "Product removed from wishList" : "Product added to wishList"
  }


  async getAllUserWishList(user: UserDocument) {
    const wishList = await this.wishListRepo.find({
      filter: { createdBy: user._id },
    })

    return wishList
  }

}


