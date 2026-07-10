import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { auth } from 'src/common/decorator/auth.decorator';
import type { UserDocument } from '../users/entities/user.entity';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';
import { User } from 'src/common/decorator/user.decorator';
import { Types } from 'mongoose';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  @auth()
  createCart(@Body() body: CreateCartDto,@User() user: UserDocument) {
    return this.cartService.createCart(user, body);
  }

  @Get()
  @auth()
  getCart(@User() user: UserDocument) {
    return this.cartService.getCart(user);
  }

  @Patch(":id")
  @auth()
  updateCart(@User() user:UserDocument, body:UpdateCartDto){
    return this.cartService.updateCart(user, body)
  }

  @Delete(":id")
  @auth()
  removeCartItem(@User() user:UserDocument , id:Types.ObjectId){
    return this.cartService.removeCartItem(user , id)
  }
}