import { ValidationPipe, } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptor/response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors()
  app.useGlobalInterceptors(new ResponseInterceptor())
  // app.useGlobalGuards(new RolesGuard(AuthGuard));

  const port = process.env.PORT;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(port!, () => {
    console.log(`server is running on port ${port}`);
  });
}
bootstrap();
