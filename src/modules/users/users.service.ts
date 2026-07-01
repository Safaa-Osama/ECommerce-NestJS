import { Injectable } from '@nestjs/common';
import { UserRepo } from 'src/database/reposetories/user-repo';
import type { UserDocument } from 'src/database/models/user.model';

@Injectable()
export class UsersService {
    constructor(private readonly userRepo: UserRepo) { }

    getAllUsers = async () => {
        const users = await this.userRepo.find();
        return users;
    }


    getProfile = async (user: UserDocument) => {
        return { user };
    }
}
