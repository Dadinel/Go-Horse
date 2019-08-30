import { Test, TestingModule } from '@nestjs/testing';
import { SonarService } from './sonar.service';

describe('SonarService', () => {
  let service: SonarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SonarService],
    }).compile();

    service = module.get<SonarService>(SonarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
