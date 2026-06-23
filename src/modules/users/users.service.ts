import { Injectable } from '@nestjs/common';
import { UserRepo } from 'src/database/reposetories/user-repo';

@Injectable()
export class UsersService {
      constructor(private readonly userRepo:UserRepo) {}
    
getAllUsers=async()=>{
    const users=await this.userRepo.find();
    return users;
}
}
