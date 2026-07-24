import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { RedisModule } from './common/services/redis/redisModule';
import { TokenService } from './common/services/token/tokenService';
import RedisService from './common/services/redis/redis.service';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './modules/category/category.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { BrandModule } from './modules/brand/brand.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { WishListModule } from './modules/wishList/wishList.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    // config 
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
    }),

    // mongo db
    MongooseModule.forRoot(process.env.DB_LOCAL!, {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('database connected'));
        connection.on('open', () => console.log('database open'));
        connection.on('disconnected', () => console.log('database disconnected'),);
        connection.on('reconnected', () => console.log('database reconnected'));
        connection.on('disconnecting', () => console.log('database disconnecting'),);

        return connection;
      },
    }),
    AuthModule,
    UsersModule,
    CategoryModule,
    SubCategoryModule,
    BrandModule,
    ProductModule,
    CouponModule,
    CartModule,
    WishListModule,
    OrderModule,
    RedisModule,
    JwtModule.register({ global: true }),
  ],

  exports: [],
  providers: [
    AppService,
    TokenService,
    RedisService,
  ],
  controllers: [AppController],
})
export class AppModule { }
