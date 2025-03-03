import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI // 开启 url 版本控制
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
