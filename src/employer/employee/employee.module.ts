import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './controller/employee.controller';
import { Employee } from 'src/models/employee.entity';
import { JobPositions } from 'src/models/employee.jobpositions.entity';
import { EmployeeService } from './service/employee.service';
import { JobPositionsService } from './service/jobpositions/jobpositions.service';
import { CandidatesService } from './service/candidates/candidates.service';
import { Candidate } from 'src/models/candidate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([JobPositions]),
    TypeOrmModule.forFeature([Candidate]),
  ],
  providers: [EmployeeService, JobPositionsService, CandidatesService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
