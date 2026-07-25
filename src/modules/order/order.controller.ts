import { Body, Controller, Post } from '@nestjs/common';
import { auth } from 'src/common/decorator/auth.decorator';
import { User } from 'src/common/decorator/user.decorator';
import type { UserDocument } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
@auth({})
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  createOrder(
    @User() user: UserDocument,
    @Body() body: CreateOrderDto
  ) {
    return this.orderService.createOrder(user, body);
  }



}
