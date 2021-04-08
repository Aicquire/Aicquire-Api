import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { from, Observable } from 'rxjs';
import { JobPositions } from 'src/models/employee.jobpositions.entity';
import { JobPositionsInterface } from 'src/models/employee.jobpositions.interface';
import { Candidate } from 'src/models/candidate.entity';
import {
  CandidateInformation,
  CandidateInterface,
} from 'src//models/candidate.interface';
import * as moment from 'moment';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: MongoRepository<Candidate>,
  ) {}
  dateToday = moment().format('MMMM DD YYYY');
  forUsername = moment().format('MM DD YY');
  usernameAdd = this.forUsername.replace(/\s+/g, '');

  async addCandidate(v: CandidateInterface): Promise<any> {
    try {
      let first = v.firstname.substring(0, 2);
      let second = v.lastname.substring(0, 3);
      v.status = 'Potential Hire';
      v.username = (first + second + this.usernameAdd).toLowerCase();
      v.dateApplied = this.dateToday;
      v.avatar = 'https://cdn.vuetifyjs.com/images/lists/1.jpg';
      v.password = '123';
      v.competencies = [];
      v.access = 0;
      v.bday = null;
      v.currencySelected = '';
      v.address = '';
      v.experienceLevel = '';
      v.expectedMonthlySalary = '';
      v.workExperience = [];
      v.education = [];
      v.certificatesAndTrainings = [];
      v.skillsAndLanguages = [];
      v.associations = [];
      v.references = [];
      v.portfolio = [];
      v.completed = false;
      await this.candidateRepository.save(v);
      console.log(v);
      return (
        'Account created for ' +
        v.firstname +
        ' ' +
        v.lastname +
        '\n\nUsername: ' +
        v.username +
        '\nPassword: ' +
        v.password
      );
    } catch (e) {
      console.log(e);
    }
  }

  async getCandidates(): Promise<any> {
    return await this.candidateRepository.find();
  }

  async getOneCandidate(v): Promise<any> {
    return await this.candidateRepository.find({ positionApplied: v });
  }

  async getonebyname(v): Promise<any> {
    return await this.candidateRepository.findOne(ObjectID(v));
  }

  async updateCompetencies(username, competencies): Promise<any> {
    return await this.candidateRepository.updateOne(
      { username: username },
      {
        $set: { competencies: competencies },
      },
      { upsert: true },
    );
  }
}
