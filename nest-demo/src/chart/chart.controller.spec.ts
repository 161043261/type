import { Test, TestingModule } from '@nestjs/testing';
import { ChartController } from './chart.controller';
import { ChartService } from './chart.service';

describe('ChartController', () => {
  let controller: ChartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartController],
      providers: [ChartService],
    }).compile();

    controller = module.get<ChartController>(ChartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
