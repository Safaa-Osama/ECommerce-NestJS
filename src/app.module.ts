import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { RedisModule } from './common/services/redis/redisModule';
import { TokenService } from './common/services/token/tokenService';
import RedisService from './common/services/redis/redis.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // config 
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),

    // mongo db
    MongooseModule.forRoot(process.env.DB_LOCAL!, {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('database connected'));
        connection.on('open', () => console.log('database open'));
        connection.on('disconnected', () => console.log('database disconnected'),);
        connection.on('reconnected', () => console.log('database reconnected'));
        connection.on('disconnecting', () => console.log('database disconnecting'),);

        return connection;
      },
    }),
    AuthModule,
    UsersModule,
    RedisModule
  ],

  exports: [],
  providers: [
    AppService,
    TokenService,
    RedisService,
  ],
  controllers: [AppController],
})
export class AppModule {}
