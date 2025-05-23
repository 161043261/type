import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.makeDynamic({ path: '/sr' }),
    UploadModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [
    // 提供 AppService2 的实例
    AppService2,
    {
      // 提供 token === "NestAppService" 的对象
      provide: 'NestAppService',
      useClass: AppService,
    },
    {
      // 提供 token === "Languages" 的对象
      provide: 'Languages',
      useValue: ['JavaScript', 'TypeScript', 'Cpp'],
    },
    {
      provide: 'DateStr',
      // 从 IOC 容器中取出并注入 AppService2 的实例
      inject: [AppService2],
      // 支持异步
      async useFactory(appService2: AppService2) {
        return new Promise((resolve) => {
          console.log('Please wait for 3s');
          setTimeout(() => {
            console.log(appService2.getHello());
            resolve(new Date().toString());
          }, 3000);
        });
        // Hello AppService2
      },
    },
  ],
})
export class AppModule {}
