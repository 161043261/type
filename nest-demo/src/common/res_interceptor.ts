import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface IResponseData<T> {
  data: T;
  ok: boolean;
  msg: string;
}

@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<IResponseData<T>> | Promise<Observable<IResponseData<T>>> {
    return next.handle().pipe(
      map((data: T) => {
        return {
          data,
          ok: true,
          msg: 'rxjs',
        };
      }),
    );
  }
}
