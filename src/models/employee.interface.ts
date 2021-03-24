import { ObjectID } from 'typeorm';

export interface EmployeeInterface {
  firstname: string;
  lastname: string;
  username: string;
  company: string;
  password: string;
  id?: ObjectID;
  access: number;
}
