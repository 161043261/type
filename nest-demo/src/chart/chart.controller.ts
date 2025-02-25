import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChartService } from './chart.service';
import { CreateChartDto } from './dto/create-chart.dto';
import { UpdateChartDto } from './dto/update-chart.dto';

@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @Post()
  create(@Body() createChartDto: CreateChartDto) {
    return this.chartService.create(createChartDto);
  }

  @Get()
  findAll() {
    return this.chartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChartDto: UpdateChartDto) {
    return this.chartService.update(+id, updateChartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartService.remove(+id);
  }
}
