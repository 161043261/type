import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotModule } from './robot/robot.module';
import { ChartModule } from './chart/chart.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './menu/menu.module';

// An IOC (Inversion of Control) container
// DI, Dependency Injection
@Module({
  imports: [
    /** 子模块 */
    RobotModule,
    ChartModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'pass',
      host: 'localhost',
      port: 3306,
      database: 'db0',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
      synchronize: true,
      retryDelay: 500,
      autoLoadEntities: true,
    }),
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
