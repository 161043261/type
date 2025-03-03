import { Module } from '@nestjs/common';
import { RobotService } from './robot.service';
import { RobotController } from './robot.controller';

@Module({
  controllers: [RobotController],
  providers: [RobotService],
})
export class RobotModule {}
