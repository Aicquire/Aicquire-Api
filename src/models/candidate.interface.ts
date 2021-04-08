import { ObjectID } from 'typeorm';

export interface CandidateInterface {
  firstname: string;
  lastname: string;
  username: string;
  bday: string;
  address: string;
  experienceLevel: string;
  expectedMonthlySalary: string;
  resumeCategory: string;
  positionApplied: string;
  password?: string;
  contactNumber: string;
  emailAddress: string;
  dateApplied: string;
  status?: string;
  competencies: Array<any>;
  currencySelected: string;
  positionId: string;
  id?: ObjectID;
  position: string;
  avatar: string;
  access: number;
  videoResponses: Array<any>;
  completed: boolean;
  workExperience: Array<CandidateWorkExperience>;
  education: Array<CandidateEducation>;
  certificatesAndTrainings: Array<CandidateCertificatesAndTrainings>;
  skillsAndLanguages: Array<CandidateSkillsAndLanguages>;
  associations: Array<CandidateAssociations>;
  references: Array<CandidateReferences>;
  portfolio: Array<CandidatePortfolio>;
}

export interface CandidateInformation {
  firstname: string;
  lastname: string;
  contactNumber: string;
  address: string;
  bday: string;
  emailAddress: string;
  experienceLevel: string;
  expectedMonthlySalary: string;
  resumeCategory: string;
  avatar: string;
  currencySelected: string;
}

export interface CandidateWorkExperience {
  position: string;
  companyName: string;
  monthlySalary: number;
  dateEnd: string;
  dateStart: string;
  workDescription: string;
  docRef: number;
}

export interface CandidateEducation {
  degree: string;
  institution: string;
  address: string;
  dateEnd: string;
  dateStart: string;
  honors: string;
  docRef: number;
}

export interface CandidateSkillsAndLanguages {
  skills: Array<string>;
  languages: Array<string>;
}

export interface CandidateCertificatesAndTrainings {
  nameOfCertificate: string;
  institution: string;
  dateAwarded: string;
  file: string;
  docRef: number;
}

export interface CandidateAssociations {
  position: string;
  association: string;
  dateStart: string;
  dateEnd: string;
  docRef: number;
}

export interface CandidateReferences {
  firstname: string;
  lastname: string;
  position: string;
  companyName: string;
  contactNumber: string;
  emailAddress: string;
  docRef: number;
}

export interface CandidatePortfolio {
  name: string;
  type: string;
  size: number;
  details: string;
  data: string;
  isDeleted: boolean;
  docRef: number;
}
