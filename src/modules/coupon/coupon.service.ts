import { BadRequestException, Injectable } from '@nestjs/common';
import { CouponRepo } from 'src/common/reposetories/coupon-repo';
import { UserRepo } from 'src/common/reposetories/user-repo';
import type { UserDocument } from '../users/entities/user.entity';
import { CreateCouponDto, UpdateCouponDto } from './dto/coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    private readonly couponRepo: CouponRepo,
    private readonly userRepo: UserRepo
  ) { }


  async createCoupon(body: CreateCouponDto, user: UserDocument) {
    const { code, discount, startDate, endDate, maxUses, usesCount, isActive } = body

    if (await this.couponRepo.findOne({ filter: { code:code.toLowerCase()} })) {
      throw new BadRequestException('Coupon already exists')
    }

    const coupon = await this.couponRepo.create({
        createdBy:user._id,
        code,
        discount,
        startDate,
        endDate,
        maxUses,
        usesCount,
        isActive,
    })

    return coupon

  }

  async updateCoupon(id: string, body: UpdateCouponDto, user: UserDocument) {
    const { code, discount, startDate, endDate, maxUses, usesCount, isActive } = body

    const coupon = await this.couponRepo.findOne({ filter: { _id: id, createdBy: user._id } })
    if (!coupon) {
      throw new BadRequestException('Coupon not found')
    }

    if(code) {
        coupon.code = code.toLowerCase()
    }
    if(discount) {
        coupon.discount = discount
    }
    if(startDate) {
        coupon.startDate = startDate
    }
    if(endDate) {
        coupon.endDate = endDate
    }
    if(maxUses) {
        coupon.maxUses = maxUses
    }
    if(usesCount) {
        coupon.usesCount = usesCount
    }
    if(isActive) {
        coupon.isActive = isActive
    }
   
    await coupon.save()
    return coupon

  }


  async deleteCoupon(id: string, user: UserDocument) {
    const coupon = await this.couponRepo.findOne({ filter: { _id: id, createdBy: user._id } })
    if (!coupon) {
      throw new BadRequestException('Coupon not found')
    }
    await this.couponRepo.findOneAndDelete({
      filter: { _id: id, createdBy: user._id } 
    })
    return coupon
  }
}
