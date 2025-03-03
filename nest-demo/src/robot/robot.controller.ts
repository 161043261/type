import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { RobotService } from './robot.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';

// 整体指定 url 版本
@Controller({ path: 'robot', version: '1' })
export class RobotController {
  constructor(private readonly robotService: RobotService) {}

  @Post()
  // 局部指定 url 版本
  @Version('1')
  create(@Body() createRobotDto: CreateRobotDto) {
    return this.robotService.create(createRobotDto);
  }

  @Get()
  findAll() {
    return this.robotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.robotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRobotDto: UpdateRobotDto) {
    return this.robotService.update(+id, updateRobotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.robotService.remove(+id);
  }
}
