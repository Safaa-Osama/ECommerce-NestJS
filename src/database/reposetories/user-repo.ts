import { Model } from 'mongoose';
import BaseRepo from './base-repo';
import userModel, { UserDocument } from '../models/user.model';


class UserRepo extends BaseRepo<UserDocument> {
    constructor(protected readonly model: Model<UserDocument> = userModel as any) {
        super(model)
    }

    async checkUser(email: string): Promise<Boolean> {
        return await this.model.findOne({ filter: { email } }) != null


    }
}

export default new UserRepo()
 