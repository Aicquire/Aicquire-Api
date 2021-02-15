import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Employee {
  @ObjectIdColumn() id: ObjectID;
  @Column() firstname: string;
  @Column() lastname: string;
  @Column() username: string;
  @Column() company: string;
  @Column() password?: string;
  @Column() access: number;

  constructor(employee?: Partial<Employee>) {
    Object.assign(this, employee);
  }
}
