import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = PORT;

  await app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });
}
bootstrap();
