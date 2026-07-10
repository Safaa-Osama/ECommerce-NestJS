import { Injectable } from '@nestjs/common';
import { UserDocument } from '../users/entities/user.entity';
import { CreateCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  create(User:UserDocument,body: CreateCartDto) {

    
    return body;
  }

}
