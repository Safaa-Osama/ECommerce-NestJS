import { Body, Controller, Post } from '@nestjs/common';
import { auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/userEnum';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/coupon.dto';


@Controller('coupon')
@auth({roles:[RoleEnum.admin]})
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Post()
  createCoupon(@Body() body: CreateCouponDto) {
    return this.couponService.createCoupon(body);
  }



  
}
