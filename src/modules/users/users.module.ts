import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import userModel from 'src/database/models/user.model';
import { UserRepo } from 'src/database/reposetories/user-repo';
import { createClient } from 'redis';

@Module({
  imports: [userModel],
  controllers: [UsersController],
  providers: [UsersService,UserRepo,
    {
       provide: "REDIS_CLIENT",
              useFactory: async () => {
                  const redis = createClient({ url: process.env.REDIS_URI })
      
                  await redis.connect();
                  redis.on("error", (err) => {
                      console.log(err)
                  })
                  return redis
              }
    }
  ],
  exports: [
    UsersService,
    UserRepo
  ],
})
export class UsersModule {}

