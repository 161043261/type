import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { join } from 'path';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.makeDynamic({ path: '/sr' }),
    UploadModule,
    LoginModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'pass',
      host: 'localhost',
      port: 3306,
      database: 'db0',
      // 可以自动加载 entity
      // entities: [join(__dirname, './**/*.entity{.js,.ts}')],
      synchronize: true, // 自动将 entity 同步到数据库
      retryDelay: 500,
      retryAttempts: 3, // 连接数据库的重试次数
      autoLoadEntities: true, // 自动加载 entity
    }),
    EmployeeModule,
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
