 import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseRepo from './base-repo';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from 'src/modules/order/entities/order.entity';

@Injectable()
export class OrderRepo extends BaseRepo<OrderDocument> {
  constructor(@InjectModel(Order.name) protected readonly orderModel: Model<OrderDocument>) {
    super(orderModel);
  }
}
