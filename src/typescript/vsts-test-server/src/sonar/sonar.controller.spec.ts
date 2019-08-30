import { Test, TestingModule } from '@nestjs/testing';
import { SonarController } from './sonar.controller';

describe('Sonar Controller', () => {
  let controller: SonarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SonarController],
    }).compile();

    controller = module.get<SonarController>(SonarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
