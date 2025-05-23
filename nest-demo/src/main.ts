import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { GlobalResponseInterceptor } from './common/res_interceptor';
import { GlobalExceptionFilter } from './common/err_filter';
// import { LoginGuard } from './login/login.guard';

function globalMiddleware(
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
) {
  console.log('originalUrl', req.originalUrl);
  next();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors();

  app.enableVersioning({
    type: VersioningType.URI, // 接口版本
  });

  app.use(globalMiddleware);

  app.use(
    session({
      secret: 'nestSecret',
      rolling: true,
      name: 'cookieName', //
      cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 60 * 24 * 7 },
    }),
  );

  app.useStaticAssets(join(__dirname, 'assets'), {
    prefix: '/static',
  });

  // 使用全局拦截器
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  // 使用全局过滤器
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new LoginGuard());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
