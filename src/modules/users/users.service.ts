import { Injectable } from '@nestjs/common';
import { UserRepo } from 'src/common/reposetories/user-repo';
import type { UserDocument } from './entities/user.entity';

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

    upload = async (user: UserDocument, file: Express.Multer.File) => {
        console.log(user);
        console.log(file);
        // const upload = await this.userRepo.create()
        return file;
    }
}
