import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseRepo from './base-repo';
import { User, UserDocument } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepo extends BaseRepo<UserDocument> {
  constructor(@InjectModel(User.name) private _userModel: Model<UserDocument>) {
    super(_userModel);
  }
}
