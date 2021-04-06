import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Questionnaire } from '../models/employee.jobpositions.interface';
@Entity()
export class JobPositions {
  @ObjectIdColumn() id: ObjectID;
  @Column() position: String;
  @Column() entries: Array<Questionnaire>;
  @Column() competencies: Array<String>;
  @Column() vacant: number

  constructor(jobPositions?: Partial<JobPositions>) {
    Object.assign(this, jobPositions);
  }
}
