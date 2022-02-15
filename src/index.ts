import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port: number = +(process?.env?.PORT ?? 56202);

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
})();
