import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import {
  CandidateWorkExperience,
  CandidateSkillsAndLanguages,
  CandidateAssociations,
  CandidateReferences,
  CandidateCertificatesAndTrainings,
  CandidateEducation,
  CandidatePortfolio,
  CandidateVideoResponse,
} from './candidate.interface';

@Entity()
export class Candidate {
  @ObjectIdColumn() id: ObjectID;
  @Column() firstname: string;
  @Column() lastname: string;
  @Column() username: string;
  @Column() positionApplied: string;
  @Column() password?: string;
  @Column() contactNumber: string;
  @Column() position: string;
  @Column() emailAddress: string;
  @Column() currencySelected: string;
  @Column() dateApplied?: string;
  @Column() status?: string;
  @Column() competencies: Array<any>;
  @Column() positionId: string;
  @Column() avatar: string;
  @Column() access: number;
  @Column() videoResponses: Array<CandidateVideoResponse>;
  @Column() completed: boolean;
  @Column() bday: string;
  @Column() address: string;
  @Column() resumeCategory: string;
  @Column() experienceLevel: string;
  @Column() expectedMonthlySalary: string;
  @Column() workExperience: Array<CandidateWorkExperience>;
  @Column() education: Array<CandidateEducation>;
  @Column() certificatesAndTrainings: Array<CandidateCertificatesAndTrainings>;
  @Column() skillsAndLanguages: Array<CandidateSkillsAndLanguages>;
  @Column() associations: Array<CandidateAssociations>;
  @Column() references: Array<CandidateReferences>;
  @Column() portfolio: Array<CandidatePortfolio>;

  constructor(candidate?: Partial<Candidate>) {
    Object.assign(this, candidate);
  }
}
