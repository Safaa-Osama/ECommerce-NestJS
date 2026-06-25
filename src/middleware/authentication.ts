// import { NextFunction, Request, Response } from "express";
// import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
// import { UserRepo } from "src/database/reposetories/user-repo";
// import { TokenService } from "src/common/services/tokenService";
// import RedisService from "src/common/services/redis/redis.service";

// @Injectable()
// export class AuthenticationService {
//     constructor(
//         public readonly tokenService: TokenService,
//         public readonly userRepo: UserRepo,
//         public readonly redisService: RedisService,
//     ){}    

// }

// @Injectable()
// export class AuthenticationMiddleware implements NestMiddleware {
//     constructor(private readonly authService: AuthenticationService) {}

//     async use(req: Request, res: Response, next: NextFunction) {
//         await authentication(req, res, next);
//     }
// }

// export const authenticateToken = async (authorization: string) => {
//     if (!authorization) {
//         throw new BadRequestException("invalid authorization");
//     }

//     const [prefix, token] = authorization.split(" ");

//     if (!token) {
//         throw new BadRequestException("Token not found");
//     }

//     let SECRET_KEY = "";

//     if (prefix === process.env.PREFIX_USER) {
//         SECRET_KEY = process.env.SECRET_KEY_USER || "";
//     } else if (prefix === process.env.PREFIX_ADMIN) {
//         SECRET_KEY = process.env.SECRET_KEY_ADMIN || "";
//     } else {
//         throw new BadRequestException("Invalid prefix");
//     }

//     const service = AuthenticationService.instance;
//     if (!service) {
//         throw new Error("AuthenticationService is not initialized. Please ensure it is registered in providers.");
//     }

//     const decoded = service.tokenService.verifyToken({
//         token,
//         secretKey: SECRET_KEY,
//     });

//     if (!decoded?.jti || !decoded?.email) {
//         throw new BadRequestException("invalid authorization !");
//     }

//     const user = await service.userRepo.findOne({
//         filter: { email: decoded.email },
//     });

//     if (!user) {
//         throw new BadRequestException("user not found");
//     }

//     return { user, decoded };
// };

// export const authentication = async (req: Request, res: Response, next: NextFunction) => {
//     const authorization = req.headers.authorization as string;

//     const { user, decoded } = await authenticateToken(authorization);

//     const service = AuthenticationService.instance;
//     if (!service) {
//         throw new Error("AuthenticationService is not initialized. Please ensure it is registered in providers.");
//     }

//     const revoked = await service.redisService.getValue(
//         service.redisService.revokedKey({
//             userId: user._id,
//             jti: decoded.jti!,
//         })
//     );

//     if (revoked) {
//         throw new BadRequestException("Invalid token revoked");
//     }

//     req.user = user;
//     req.decoded = decoded;

//     next();
// };

// export const gql_authentication = async (authorization: string) => {
//     const { user, decoded } = await authenticateToken(authorization);

//     return { user, decoded };
// };