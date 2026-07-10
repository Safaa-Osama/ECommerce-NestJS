import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/cart.dto';
import type { UserDocument } from '../users/entities/user.entity';
import { auth } from 'src/common/decorator/auth.decorator';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  @auth()
  create(@Body() body: CreateCartDto, user: UserDocument) {
    return this.cartService.create(user, body);
  }
}