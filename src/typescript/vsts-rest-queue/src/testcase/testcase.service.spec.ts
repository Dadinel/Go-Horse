import { Test, TestingModule } from '@nestjs/testing';
import { TestCaseService } from './testcase.service';

describe('ServerService', () => {
  let service: TestCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestCaseService],
    }).compile();

    service = module.get<TestCaseService>(TestCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
