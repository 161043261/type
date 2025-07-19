import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

// 类装饰器
export const Custom = (...args: string[]) => SetMetadata('myArgs', args);
// 参数装饰器
export const ReqUrl = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    console.log(data); // abc
    const req = context.switchToHttp().getRequest<ExpressRequest>();
    return req.url;
  },
);
