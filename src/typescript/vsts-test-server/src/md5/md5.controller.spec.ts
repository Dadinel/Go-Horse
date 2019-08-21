import { Test, TestingModule } from '@nestjs/testing';
import { Md5Controller } from './md5.controller';

describe('Md5 Controller', () => {
  let controller: Md5Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Md5Controller],
    }).compile();

    controller = module.get<Md5Controller>(Md5Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
