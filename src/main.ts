import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors()

  const port = process.env.PORT;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(port!, () => {
    console.log(`server is running on port ${port}`);
  });
}
bootstrap();
