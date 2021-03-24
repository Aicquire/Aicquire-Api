import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Questionnaire } from '../models/employee.jobpositions.interface';
@Entity()
export class JobPositions {
  @ObjectIdColumn() id: ObjectID;
  @Column() position: string;
  @Column() entries: Array<Questionnaire>;

  constructor(jobPositions?: Partial<JobPositions>) {
    Object.assign(this, jobPositions);
  }
}
