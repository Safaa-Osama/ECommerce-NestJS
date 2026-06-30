import { HydratedDocument } from 'mongoose';
import { User } from '../../database/models/user.model';
import { JwtPayload } from 'jsonwebtoken';

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