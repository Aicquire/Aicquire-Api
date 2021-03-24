import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { from, Observable } from 'rxjs';
import { JobPositions } from 'src/models/employee.jobpositions.entity';
import { JobPositionsInterface } from 'src/models/employee.jobpositions.interface';

@Injectable()
export class JobPositionsService {
  constructor(
    @InjectRepository(JobPositions)
    private readonly jobPositionsRepository: MongoRepository<JobPositions>,
  ) {}

  async addPosition(v: JobPositionsInterface): Promise<any> {
    return await this.jobPositionsRepository.save(v);
  }

  async getPositions(): Promise<any> {
    return await this.jobPositionsRepository.find();
  }

  async getOnePosition(v): Promise<any> {
    return await this.jobPositionsRepository.findOne(ObjectID(v));
  }

  async updateEntries(id, entries): Promise<any> {
    return await this.jobPositionsRepository.updateOne(
      { _id: new ObjectID(id) },
      {
        $set: { entries: entries },
      },
      { upsert: true },
    );
  }
}
