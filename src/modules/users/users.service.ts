import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserRepo } from 'src/database/reposetories/user-repo';

@Injectable()
export class UsersService {
    constructor(private readonly userRepo: UserRepo) { }

    getAllUsers = async () => {
        const users = await this.userRepo.find();
        return users;
    }


    getProfile = async (req: Request) => {
        const user = await this.userRepo.findOne({
            filter: { _id: req?.user?._id }
        })
        return {user};
    }
}
