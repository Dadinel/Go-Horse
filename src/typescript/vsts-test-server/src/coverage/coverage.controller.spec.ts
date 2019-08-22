import { Test, TestingModule } from '@nestjs/testing';
import { CoverageController } from './coverage.controller';

describe('Coverage Controller', () => {
  let controller: CoverageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoverageController],
    }).compile();

    controller = module.get<CoverageController>(CoverageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
