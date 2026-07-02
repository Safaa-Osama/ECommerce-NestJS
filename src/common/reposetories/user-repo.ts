 import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseRepo from './base-repo';
import { User, UserDocument } from '../../modules/users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepo extends BaseRepo<UserDocument> {
  constructor(@InjectModel(User.name) protected readonly userModel: Model<UserDocument>) {
    super(userModel);
  }
}
