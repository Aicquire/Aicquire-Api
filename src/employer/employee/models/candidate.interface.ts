import { ObjectID } from 'typeorm';

export interface CandidateInterface {
  firstname: string;
  lastname: string;
  username: string;
  positionApplied: string;
  password?: string;
  contactNumber: string;
  emailAddress: string;
  dateApplied: string;
  status?: string;
  competencies: Array<any>;
  positionId: string;
  id?: ObjectID;
  avatar: string;
  access: number;
  videoResponses: Array<any>;
  completed: boolean;
}
