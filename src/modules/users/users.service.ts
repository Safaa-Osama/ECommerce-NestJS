import { Injectable } from '@nestjs/common';
import { UserRepo } from 'src/database/reposetories/user-repo';
import type { IRequest } from 'src/utilis/types/request.type';

@Injectable()
export class UsersService {
    constructor(private readonly userRepo: UserRepo) { }

    getAllUsers = async () => {
        const users = await this.userRepo.find();
        return users;
    }


    getProfile = async (req: IRequest) => {
        return { user: req?.user };
    }
}
