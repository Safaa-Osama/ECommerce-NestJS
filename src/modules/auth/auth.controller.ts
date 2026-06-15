
import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {

    constructor(private readonly _authService: AuthService){ }

@Get()
    getAuthPage(){
        return 'AUTH page';
    }

    @Post('register')
    register(){
        return 'register';

    }

    @Post('login')
    login(){
        return 'login';
    }
}