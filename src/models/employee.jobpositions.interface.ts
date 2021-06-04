import { ObjectID } from 'typeorm';

export interface JobPositionsInterface {
  position: string;
  description: string;
  vacant: number;
  competencies: Array<any>;
  entries: Array<Questionnaire>;
  id?: ObjectID;
}

export interface Questionnaire {
  question: string;
  minutes: string;
}
