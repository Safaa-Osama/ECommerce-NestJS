import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrderRepo } from 'src/common/reposetories/order-repo';
import { UserRepo } from 'src/common/reposetories/user-repo';
import RedisService from 'src/common/services/redis/redis.service';
import { TokenService } from 'src/common/services/token/tokenService';
import { cartModel } from '../cart/entities/cart.entity';
import couponModel from '../coupon/entities/coupon.entity';
import userModel from '../users/entities/user.entity';
import orderModel from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import productModel from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { CouponRepo } from 'src/common/reposetories/coupon-repo';
import ProductRepo from 'src/common/reposetories/product-repo';
import { CartRepo } from 'src/common/reposetories/cart-repo';
import { StripeService } from 'src/common/services/stripe/stripe.service';

@Module({
  imports: [orderModel, cartModel, couponModel, userModel,productModel],
  controllers: [OrderController],
  providers: [OrderService, OrderRepo,CartRepo,CouponRepo,ProductRepo,
    RedisService, TokenService, JwtService, UserRepo,StripeService
  ],
})
export class OrderModule { }
