import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as env from "./environment";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
