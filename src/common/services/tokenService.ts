// import { JwtService } from '@nestjs/jwt';
// import { Injectable } from '@nestjs/common';


// class TokenService {
//     constructor(){}

//     generateToken({ payload, secretKey, options }: {
//     payload: object
//     secretKey: Secret,
//     options?: SignOptions
// }): string {
//     return jwt.sign(payload, secretKey, options)
// }

// verifyToken({ token, secretKey, options }: {

//     token: string,
//     secretKey: Secret,
//     options?: VerifyOptions,
// }): JwtPayload {
//     return jwt.verify(token, secretKey, options) as JwtPayload
// }
// }

// export default TokenService