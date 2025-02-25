import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotModule } from './robot/robot.module';

// An IOC (Inversion of Control) container
// DI, Dependency Injection
@Module({
  imports: [
    /** 子模块 */
    RobotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
