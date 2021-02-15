import { Test, TestingModule } from '@nestjs/testing';
import { JobPositionsService } from './jobpositions.service';

describe('JobpositionsService', () => {
  let service: JobPositionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobPositionsService],
    }).compile();

    service = module.get<JobPositionsService>(JobPositionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
