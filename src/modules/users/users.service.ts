import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/models/user.model';

@Injectable()
export class UsersService {
      constructor(@InjectModel(User.name) private _userModel: Model<User>) {}
    
getAllUsers=async()=>{
    const users=await this._userModel.find();
    return users;
}
}
