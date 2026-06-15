import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  exports: [],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule { }
