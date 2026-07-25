import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { auth } from 'src/common/decorator/auth.decorator';
import { User } from 'src/common/decorator/user.decorator';
import type { UserDocument } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { Types } from 'mongoose';

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

  @Patch(":id/cancel")
  cancelOrder(
    @User() user: UserDocument,
    @Param("id") orderId: Types.ObjectId
  ) {
    return this.orderService.cancelOrder(user, orderId);
  }

  @Get()
  getUserOrders(@User() user: UserDocument) {
    return this.orderService.getUserOrders(user);
  }

}
