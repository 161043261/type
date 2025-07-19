import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    // 从 IOC 容器中按 token === "NestAppService" 取出
    // 并注入 appService, 以构造 appController
    @Inject('NestAppService')
    private readonly appService: AppService,
    // 从 IOC 容器中按 token === "Languages" 取出
    // 并注入 langs, 以构造 appController
    @Inject('Languages') private readonly langs: string[],
    // 从 IOC 容器中按 token === "DateStr" 取出
    // 并注入 DateStr, 以构造 appController
    @Inject('DateStr') private readonly dateStr: string,

    private readonly userService: UserService,
  ) {
    console.log('Provide by Nest.js IOC container', this.dateStr);
    appService.dateStr = this.dateStr;
    this.appService.setLangs(this.langs);
  }

  @Get()
  getHello(): string {
    this.langs.push(this.dateStr);
    this.langs.push(this.userService.findAll());
    console.log('this.langs', this.langs);
    return 'Hello World!';
  }
}
