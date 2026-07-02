import { HydratedDocument } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { User } from 'src/modules/users/entities/user.entity';

// declare module "express" {
//     interface Request {
//         user?: HydratedDocument<User>;
//         decoded?: any;
//     }
// }  

export interface IRequest {
    user?: HydratedDocument<User>;
    decoded?: JwtPayload;
}