import { Controller, Get, Param, Patch } from '@nestjs/common';
import { Types } from 'mongoose';
import { User } from 'src/common/decorator/user.decorator';
import type { UserDocument } from '../users/entities/user.entity';
import { WishListService } from './wishList.service';
import { auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/userEnum';


@Controller('wishList')
@auth({roles:[RoleEnum.admin,RoleEnum.user]})
export class WishListController {
  constructor(private readonly wishListService: WishListService) { }



  @Patch(':id')
  toggleWishList(@Param('id') id: Types.ObjectId,
    @User() user: UserDocument) {
    return this.wishListService.toggleWishList(id, user);
  }

  @Get()
  getAllUserWishList(@User() user: UserDocument) {
    return this.wishListService.getAllUserWishList(user);
  }




}