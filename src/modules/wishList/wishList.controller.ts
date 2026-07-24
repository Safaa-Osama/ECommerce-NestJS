import { Controller } from '@nestjs/common';
import { WishListService } from './wishList.service';


@Controller('wishList')
export class WishListController {
  constructor(private readonly wishListService: WishListService) { }

 

  

 

}