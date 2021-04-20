import { Injectable } from '@nestjs/common';
import { Candidate } from 'src/models/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import {
  CandidateAssociations,
  CandidateCertificatesAndTrainings,
  CandidateEducation,
  CandidateInformation,
  CandidateReferences,
  CandidateSkillsAndLanguages,
  CandidatePortfolio,
} from 'src/models/candidate.interface';
import { CandidateWorkExperience } from 'src/models/candidate.interface';
import * as randomize from 'randomatic';

@Injectable()
export class JobseekerService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: MongoRepository<Candidate>,
  ) {}

  async login(username: any, password: any) {
    const verify = await this.checkIfMatch(username, password);
    if (verify == 0) return 'Username does not exist';
    else if (verify == 2) return 'Incorrect username or password';
    else {
      return verify;
    }
  }

  async getData(v): Promise<any> {
    return await this.candidateRepository.find({ username: v });
  }

  // ***********************************************************************
  // Profile
  // ***********************************************************************

  async updateProfileInformation(
    v: CandidateInformation,
    username,
  ): Promise<any> {
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username },
        {
          $set: {
            avatar: v.avatar,
            firstname: v.firstname,
            lastname: v.lastname,
            contactNumber: v.contactNumber,
            address: v.address,
            bday: v.bday,
            emailAddress: v.emailAddress,
            experienceLevel: v.experienceLevel,
            expectedMonthlySalary: v.expectedMonthlySalary,
            resumeCategory: v.resumeCategory,
            currencySelected: v.currencySelected,
          },
        },

        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  // ***********************************************************************
  // Work Experience
  // ***********************************************************************

  async addWorkExperience(v: CandidateWorkExperience, username): Promise<any> {
    v.docRef = randomize('00000');
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username },
        {
          $push: { workExperience: v },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        docRef: v.docRef,
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  async updateWorkExperience(
    v: CandidateWorkExperience,
    username,
  ): Promise<any> {
    var returnValue;
    console.log(v);
    try {
      await this.candidateRepository.updateOne(
        { username: username, 'workExperience.docRef': v.docRef },
        {
          $set: { 'workExperience.$': v },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        docRef: v.docRef,
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  async deleteWorkExperience(
    v: CandidateWorkExperience,
    username,
  ): Promise<any> {
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username, 'workExperience.docRef': v.docRef },
        {
          $pull: { workExperience: { docRef: v.docRef } },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  // ***********************************************************************
  // Education
  // ***********************************************************************

  async addEducation(v: CandidateEducation, username): Promise<any> {
    v.docRef = randomize('00000');
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username },
        {
          $push: { education: v },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        docRef: v.docRef,
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  async updateEducation(v: CandidateEducation, username): Promise<any> {
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username, 'education.docRef': v.docRef },
        {
          $set: { 'education.$': v },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        docRef: v.docRef,
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  async deleteEducation(v: CandidateEducation, username): Promise<any> {
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username, 'education.docRef': v.docRef },
        {
          $pull: { education: { docRef: v.docRef } },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  // ***********************************************************************
  // Certificates and Trainings
  // ***********************************************************************

  async addCertificatesAndTrainings(
    v: CandidateCertificatesAndTrainings,
    username,
  ): Promise<any> {
    var returnValue;
    v.docRef = randomize('00000');
    try {
      await this.candidateRepository.updateOne(
        { username: username },
        {
          $push: { certificatesAndTrainings: v },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        docRef: v.docRef,
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }
  async updateCertificatesAndTrainings(
    v: CandidateCertificatesAndTrainings,
    username,
  ): Promise<any> {
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username, 'certificatesAndTrainings.docRef': v.docRef },
        {
          $set: { 'certificatesAndTrainings.$': v },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        docRef: v.docRef,
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  async deleteCertificatesAndTrainings(
    v: CandidateCertificatesAndTrainings,
    username,
  ): Promise<any> {
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username, 'certificatesAndTrainings.docRef': v.docRef },
        {
          $pull: { certificatesAndTrainings: { docRef: v.docRef } },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  // ***********************************************************************
  // Associations
  // ***********************************************************************

  async addAssociations(v: CandidateAssociations, username): Promise<any> {
    v.docRef = randomize('00000');
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username },
        {
          $push: { associations: v },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        docRef: v.docRef,
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  async updateAssociations(v: CandidateAssociations, username): Promise<any> {
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username, 'associations.docRef': v.docRef },
        {
          $set: { 'associations.$': v },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        docRef: v.docRef,
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  async deleteAssociations(v: CandidateAssociations, username): Promise<any> {
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username, 'associations.docRef': v.docRef },
        {
          $pull: { associations: { docRef: v.docRef } },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  // ***********************************************************************
  // References
  // ***********************************************************************

  async addReferences(v: CandidateReferences, username): Promise<any> {
    v.docRef = randomize('00000');
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username },
        {
          $push: { references: v },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        docRef: v.docRef,
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  async updateReferences(v: CandidateReferences, username): Promise<any> {
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username, 'references.docRef': v.docRef },
        {
          $set: { 'references.$': v },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        docRef: v.docRef,
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  async deleteReferences(v: CandidateReferences, username): Promise<any> {
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username, 'references.docRef': v.docRef },
        {
          $pull: { references: { docRef: v.docRef } },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  // ***********************************************************************
  // Skills and Languages
  // ***********************************************************************

  async updateSkillsAndLanguages(
    v: CandidateSkillsAndLanguages,
    username,
  ): Promise<any> {
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username },
        {
          $set: {
            skillsAndLanguages: { skills: v.skills, languages: v.languages },
          },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
      });
    }
  }

  // ***********************************************************************
  // Portfolio
  // ***********************************************************************

  async addPortfolio(portfolio: CandidatePortfolio, username): Promise<any> {
    portfolio.docRef = randomize('00000');
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username },
        {
          $push: {
            portfolio: portfolio,
          },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        docRef: portfolio.docRef,
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
        error: e,
      });
    }
  }

  async updatePortfolioDetails(
    portfolio: CandidatePortfolio,
    username,
  ): Promise<any> {
    var returnValue;
    try {
      await this.candidateRepository.updateOne(
        { username: username, 'portfolio.docRef': portfolio.docRef },
        {
          $set: { 'portfolio.$': portfolio },
        },
        { upsert: true },
      );
      var data = await this.getData(username);
      returnValue = {
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
        error: e,
      });
    }
  }

  // ***********************************************************************
  // Video Response
  // ***********************************************************************

  async addVideoResponse(username, videoResponses): Promise<any> {
    return await this.candidateRepository.updateOne(
      { username: username },
      {
        $set: { completed: true, videoResponses: videoResponses },
      },
      { upsert: true },
    );
  }

  async addOneVideoResponse(username, videoResponses): Promise<any> {
    var returnValue;
    try {
      // UPDATES ONE ELEMENT
      var update = await this.candidateRepository.updateOne(
        {
          username: username,
          'videoResponses.questionNumber': videoResponses.questionNumber,
        },
        {
          $set: { 'videoResponses.$': videoResponses },
        },
        { upsert: false },
      );
      // ADDS ONE ELEMENT
      if (update.modifiedCount == 0) {
        await this.candidateRepository.updateOne(
          {
            username: username,
          },
          {
            $push: { videoResponses: videoResponses },
          },
          { upsert: true },
        );
      }
      var data = await this.getData(username);
      returnValue = {
        status: 200,
        data,
      };
      return returnValue;
    } catch (e) {
      return (returnValue = {
        status: 500,
        error: e,
      });
    }
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
