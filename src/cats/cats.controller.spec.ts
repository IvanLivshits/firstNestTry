import { Test, TestingModule } from '@nestjs/testing';
import { GetCatController } from './cats.controller';

describe('GetCatController', () => {
  let controller: GetCatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCatController],
    }).compile();

    controller = module.get<GetCatController>(GetCatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
