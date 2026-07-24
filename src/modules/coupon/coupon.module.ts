import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CouponRepo } from 'src/common/reposetories/coupon-repo';
import { UserRepo } from 'src/common/reposetories/user-repo';
import { TokenService } from 'src/common/services/token/tokenService';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import userModel from '../users/entities/user.entity';
import couponModel from './entities/coupon.entity';
import RedisService from 'src/common/services/redis/redis.service';


@Module({
  imports: [userModel, couponModel],  
  controllers: [CouponController],
  providers: [CouponService, CouponRepo, UserRepo, TokenService, JwtService, RedisService],
})


export class CouponModule { }
