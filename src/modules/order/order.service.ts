import { BadGatewayException, Injectable } from '@nestjs/common';
import { OrderStatus, PaymentMethod, PaymentStatus } from 'src/common/enums/orderEnum';
import { CartRepo } from 'src/common/reposetories/cart-repo';
import { CouponRepo } from 'src/common/reposetories/coupon-repo';
import { OrderRepo } from 'src/common/reposetories/order-repo';
import ProductRepo from 'src/common/reposetories/product-repo';
import { UserDocument } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/order.dto';
import { Types } from 'mongoose';

@Injectable()
export class OrderService {

  constructor(
    private readonly orderRepo: OrderRepo,
    private readonly cartRepo: CartRepo,
    private readonly couponRepo: CouponRepo,
    private readonly productRepo: ProductRepo,
  ) { }
  async createOrder(user: UserDocument, body: CreateOrderDto) {
    const { couponId, paymentMethod, phone, address } = body;

    let coupon;
    if (couponId) {
      coupon = await this.couponRepo.findOne({
        filter: {
          _id: couponId as Types.ObjectId,
          usedBy: { $nin: [user._id] },
          startDate: { $lte: new Date() },
          endDate: { $gte: new Date() },
        }
      })
      if (!coupon) {
        throw new BadGatewayException("coupon is not found or expired or used before");
      }
    }

    const cart = await this.cartRepo.findOne({
      filter:
        { user: user._id },

    })
    if (!cart || cart.products.length === 0) {
      throw new BadGatewayException("cart is not found or empty");
    }

    for (const cartItem of cart.products) {
      const product = await this.productRepo.findOneAndUpdate({
        filter: {
          _id: cartItem.productId,
          stock: { $gte: cartItem.quantity }
        },
        update: {
          $inc: { stock: -cartItem.quantity }
        }
      });
      if (!product) {
        throw new BadGatewayException("product is not found or out of stock");
      }
    }

    let totalAfterDiscount = coupon ? cart.totalPrice - (cart.totalPrice * coupon.discount / 100) :
      cart.totalPrice;

    let order = await this.orderRepo.create({
      userId: user._id,
      cartId: cart._id,
      couponId: coupon?._id,
      paymentMethod,
      phone,
      address,
      status: OrderStatus.pending,
      paymentStatus: paymentMethod == PaymentMethod.cash ? PaymentStatus.paid : PaymentStatus.pending,
      totalPrice: cart.totalPrice,
      totalAfterDiscount,

    });


    if (coupon) {
      await this.couponRepo.findOneAndUpdate({
        filter: { _id: coupon._id },
        update: {
          $push: { usedBy: user._id },
          $inc: { maxUsage: -1, totalUsage: 1 }
        }
      });
    }

    await this.cartRepo.findOneAndUpdate({
      filter: { _id: cart._id },
      update: { products: [] }
    });

    return order;

  }



  async cancelOrder(user: UserDocument, orderId: Types.ObjectId) {
    const order = await this.orderRepo.findOne({
      filter: {
        _id: orderId,
        userId: user._id,
        status: OrderStatus.pending,
      }
    });
    if (!order) {
      throw new BadGatewayException("order is not found or not in pending status");
    }
    await this.orderRepo.findOneAndUpdate({
      filter: { _id: order._id },
      update: { status: OrderStatus.cancelled }
    });
    return "order cancelled successfully";
  }

  async getUserOrders(user: UserDocument) {
    const orders = await this.orderRepo.find({ filter: {userId: user._id } });
    return orders;
  }


}
