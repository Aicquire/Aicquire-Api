import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Candidate {
  @ObjectIdColumn() id: ObjectID;
  @Column() firstname: string;
  @Column() lastname: string;
  @Column() username: string;
  @Column() positionApplied: string;
  @Column() password?: string;
  @Column() contactNumber: string;
  @Column() emailAddress: string;
  @Column() dateApplied?: string;
  @Column() status?: string;
  @Column() competencies: Array<any>;
  @Column() positionId: string;
  @Column() avatar: string;
  @Column() access: number;
  @Column() videoResponses: Array<any>;
  @Column() completed: boolean;

  constructor(candidate?: Partial<Candidate>) {
    Object.assign(this, candidate);
  }
}
