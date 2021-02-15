import { Injectable } from '@nestjs/common';
import { Candidate } from 'src/employer/employee/models/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
@Injectable()
export class JobseekerService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: MongoRepository<Candidate>,
  ) {}

  async login(username: any, password: any) {
    let returnValue;
    const verify = await this.checkIfMatch(username, password);
    if (verify == 0) return 'Invalid Credentials';
    else if (verify == 2) return 'Invalid Credentials';
    else {
      console.log(verify);
      returnValue = {
        isLoggedIn: true,
        username: verify['username'],
        firstname: verify['firstname'],
        lastname: verify['lastname'],
        positionApplied: verify['positionApplied'],
        emailAddress: verify['emailAddress'],
        dateApplied: verify['dateApplied'],
        completed: verify['completed'],
      };
      console.log(returnValue);
      return returnValue;
    }
  }

  async addVideoResponse(username, videoResponses): Promise<any> {
    return await this.candidateRepository.updateOne(
      { username: username },
      {
        $set: { completed: true, videoResponses: videoResponses },
      },
      { upsert: true },
    );
  }

  async checkIfMatch(username: string, password: string) {
    const value = await this.candidateRepository.findOne({
      username: username,
    });
    if (value != null)
      if (value.password == password) return value;
      else return 2;
    else return 0;
  }
}
