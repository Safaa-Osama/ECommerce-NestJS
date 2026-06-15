import { Body, Controller, Get, Post, Put, Param, } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hi')
  sayHi(): string {
    return this.appService.sayHi();
  }

  @Post('users')
  createUser(@Body() body: any) {
    return this.appService.createUser(body);
  }

  @Put('users/:email')
  updateUser(
    @Param('email') email: string,
    @Body() body: any,
  ) {
    return this.appService.updateUser(email, body);
  }
}