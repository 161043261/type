import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(Object.keys(context));
    console.log(
      'myKey',
      this.reflector.get<string>('myKey', context.getHandler()),
    );

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('roles', roles);
    // myArgs [ 'a', 'b', 'c' ]
    console.log(
      'myArgs',
      this.reflector.get<string[]>('myArgs', context.getHandler()),
    );
    const req = context.switchToHttp().getRequest<ExpressRequest>();
    const role = req.query.role as string;
    return roles.includes(role);
  }
}
