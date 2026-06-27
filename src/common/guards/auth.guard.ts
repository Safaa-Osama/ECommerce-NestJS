
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../services/token/tokenService';
import { UserRepo } from 'src/database/reposetories/user-repo';
import RedisService from '../services/redis/redis.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepo: UserRepo,
    private readonly redisService: RedisService,
    private readonly reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tokenType = this.reflector.get('tokenType', context.getHandler());
    if (tokenType) {
    console.log({ tokenType });
    }
    
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
    if (!token) {
      throw new UnauthorizedException("Token not found");
    }

    const decodedPayload = await this.tokenService.decodeToken(token);
    console.log({ decodedPayload });

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
