import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { from, Observable } from 'rxjs';
import { Employee } from 'src/models/employee.entity';
import { EmployeeInterface } from 'src/models/employee.interface';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: MongoRepository<Employee>,
  ) {}

  async register(v: EmployeeInterface): Promise<any> {
    v.access = 1;
    return await this.employeeRepository.save(v);
  }

  async login(username: any, password: any, company: any) {
    const verify = this.checkIfMatch(username, password, company);
    if ((await verify) == 0) return 'Username does not exist';
    else if ((await verify) == 2) return 'Incorrect username or password';
    else {
      return true;
    }
  }

  async checkIfMatch(username: string, password: string, company: string) {
    const value = await this.employeeRepository.findOne({
      username: username,
    });
    console.log(value);
    if (value != null)
      if (value.password == password && value.company == company) return 1;
      else return 2;
    else return 0;
  }

  // passwordMatch(password: string, verifyPassword: string) {
  //   if (password == verifyPassword) return 1;
  //   else return 0;
  // }

  // async checkIfExists(username: any) {
  //   const value = await this.employeeRepository.findOne({
  //     userName: username,
  //   });
  //   if (value != null) return '1';
  //   else return 0;
  // }
}
