import { Test, TestingModule } from '@nestjs/testing';
import { Md5Service } from './md5.service';

describe('Md5Service', () => {
  let service: Md5Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Md5Service],
    }).compile();

    service = module.get<Md5Service>(Md5Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
