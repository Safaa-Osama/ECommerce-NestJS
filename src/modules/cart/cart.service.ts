import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import ProductRepo from 'src/common/reposetories/product-repo';
import type { UserDocument } from '../users/entities/user.entity';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';
import CartRepo from 'src/common/reposetories/cart-repo';
import { Types } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    private readonly productRepo: ProductRepo,
    private readonly cartRepo: CartRepo
  ) { }


  async createCart(User: UserDocument, body: CreateCartDto) {
    const { productId, quantity } = body
    const product = await this.productRepo.findOne({
      filter: { _id: productId, stock: { $gte: quantity } }
    })

    if (!product) {
      throw new NotFoundException("Product not found or out of stock")
    }

    let cart = await this.cartRepo.findOne({ filter: { createdBy: User._id } })
    if (!cart) {
      cart = await this.cartRepo.create({
        products: [{ productId: product._id, quantity, subTotal: (product.priceAfterDiscount * quantity) }],
        totalPrice: product.price * quantity,
        createdBy: User._id
      })
    }

    const productExist = cart.products.find((product) => product.productId.toString() === productId.toString())
    if (productExist) {
      productExist.quantity += quantity
      productExist.subTotal += (product.priceAfterDiscount * quantity)
    }
    else {
      cart.products.push({ productId: product._id, quantity, subTotal: (product.priceAfterDiscount * quantity) })
    }

    cart.totalPrice += (product.priceAfterDiscount * quantity)

    return cart;
  }


  async getCart(User: UserDocument) {
    const cart = await this.cartRepo.findOne({
      filter: { createdBy: User._id }
    })
    return cart
  }



  async updateCart(user: UserDocument, body: UpdateCartDto) {
    const { productId, quantity } = body;

    const cart = await this.cartRepo.findOne({
      filter: { createdBy: user._id }
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItems = cart.products.find(
      (item) => item.productId.toString() === productId!.toString(),
    );

    if (!cartItems) {
      throw new NotFoundException('Product not found in cart');
    }

    const product = await this.productRepo.findOne({
      filter: { _id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (quantity && quantity > product.stock) {
      throw new BadRequestException('Out of stock');
    }

    cartItems.quantity = quantity!;
    cartItems.subTotal = quantity! * product.priceAfterDiscount;

    await cart.save();

    return cart;
  }

  async removeCartItem(user:UserDocument , productId:Types.ObjectId){
    const cart = await this.cartRepo.findOne({
      filter: { createdBy: user._id }
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItems = cart.products.find(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (!cartItems) {
      throw new NotFoundException('Product not found in cart');
    }

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId.toString(),
    );

    cart.totalPrice -= cartItems.subTotal;

    await cart.save();

    return cart;
  }
}
