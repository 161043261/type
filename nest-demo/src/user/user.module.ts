import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from '../logger/logger.middleware';

@Module({
  controllers: [UserController],
  // 为 UserController 的构造方法提供 UserService 的实例
  providers: [UserService],
  // 默认 UserService 仅在本 UserModule 下可用，在其他 Module 下不可用
  // 如果希望 UserService 跨 Module 可用，则需要在 exports 中导出

  //! Optional list of the subset of providers that are provided by this module
  //! and should be available in other modules which import this module.
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');

    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'user',
      method: RequestMethod.GET, // 只对 GET 请求使用拦截器
    });
  }
}
