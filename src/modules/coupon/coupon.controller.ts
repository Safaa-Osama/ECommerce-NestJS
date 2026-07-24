import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { auth } from 'src/common/decorator/auth.decorator';
import { User } from 'src/common/decorator/user.decorator';
import { RoleEnum } from 'src/common/enums/userEnum';
import type { UserDocument } from '../users/entities/user.entity';
import { CouponService } from './coupon.service';
import { CreateCouponDto, UpdateCouponDto } from './dto/coupon.dto';


@Controller('coupon')
@auth({ roles: [RoleEnum.admin] })
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Post()
  createCoupon(
    @Body() body: CreateCouponDto,
    @User() user: UserDocument
  ) {
    return this.couponService.createCoupon(body, user);
  }

  @Put(':id')
  updateCoupon(
    @Param('id') id: string,
    @Body() body: UpdateCouponDto,
    @User() user: UserDocument
  ) {
    return this.couponService.updateCoupon(id, body, user);
  }

  @Delete(':id')
  deleteCoupon(
    @Param('id') id: string,
    @User() user: UserDocument
  ) {
    return this.couponService.deleteCoupon(id, user);
  }




}
