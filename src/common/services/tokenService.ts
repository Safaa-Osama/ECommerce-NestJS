import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
export class TokenService {

  constructor(private readonly jwtService: JwtService) { }

  generateToken({ payload, options }: {
    payload: object;
    options?: JwtSignOptions;
  }): Promise<string> {
    return this.jwtService.signAsync(payload, options);
  }

  verifyToken({ token, options }: {
    token: string;
    options?: JwtVerifyOptions;
  }): Promise<object> {
    return this.jwtService.verifyAsync(token, options);
  }
}