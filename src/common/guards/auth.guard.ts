
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token/tokenService';
import { UserRepo } from 'src/database/reposetories/user-repo';
import RedisService from '../services/redis/redis.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    public readonly tokenService: TokenService,
    public readonly userRepo: UserRepo,
    public readonly redisService: RedisService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean>{
    let request: any = null;
    let authorization: string = ""

    if (context.getType() == "http") {
      request = context.switchToHttp().getRequest();
      authorization = request?.headers?.authorization;
      console.log({ authorization });
    }
    else if (context.getType() == "ws") {
      request = context.switchToWs().getClient();
    }
    else if (context.getType() == "rpc") {
      request = context.switchToRpc().getContext();
    }

    if (!authorization) {
            throw new UnauthorizedException("Authorization token is required");
        }
        const token = authorization.split(" ")[1];
        console.log({token});
        

        if (!token) {
            throw new UnauthorizedException("Token not found");
        }

            const decodedPayload = await this.tokenService.decodeToken(token);
            console.log({decodedPayload});
            
            if (!decodedPayload || !decodedPayload.role) {
                throw new UnauthorizedException("Invalid token payload, role is missing");
            }

            const { ACCESS_SECRET_KEY } = await this.tokenService.getSignature(decodedPayload.role);
            const { user, decoded } = await this.tokenService.authenticateToken_fetchUser(token, ACCESS_SECRET_KEY);

            request.user = user;
            request.decoded = decoded;

    return true;
  }
}
