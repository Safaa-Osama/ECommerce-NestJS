import { NextFunction, Request, Response } from "express";
import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { UserRepo } from "src/database/reposetories/user-repo";
import { TokenService } from "src/common/services/token/tokenService";
import RedisService from "src/common/services/redis/redis.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        public readonly tokenService: TokenService,
        public readonly userRepo: UserRepo,
        public readonly redisService: RedisService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;
        console.log(authorization);


        if (!authorization) {
            throw new UnauthorizedException("Authorization token is required");
        }
        const [prefix, token] = authorization.split(" ");

        if (!token) {
            throw new UnauthorizedException("Token not found");
        }

        try {
            const decodedPayload = this.tokenService.decodeToken(token);
            if (!decodedPayload || !decodedPayload.role) {
                throw new UnauthorizedException("Invalid token payload, role is missing");
            }

            const { ACCESS_SECRET_KEY } = await this.tokenService.getSignature(decodedPayload.role);
            const { user, decoded } = await this.tokenService.authenticateToken_fetchUser(token, ACCESS_SECRET_KEY);

            req.user = user;
            req.decoded = decoded;
            next();
        } catch (error: any) {
            throw new UnauthorizedException(error.message || "Authentication failed");
        }
    }
}