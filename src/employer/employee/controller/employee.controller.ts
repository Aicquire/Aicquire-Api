import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  HttpStatus,
  Req,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { EmployeeService } from '../service/employee.service';
import { EmployeeInterface } from 'src/models/employee.interface';
import { JobPositionsService } from './../service/jobpositions/jobpositions.service';
import { JobPositionsInterface } from 'src/models/employee.jobpositions.interface';
import { get } from 'http';
import { CandidatesService } from '../service/candidates/candidates.service';
import { CandidateInterface } from 'src/models/candidate.interface';

@Controller('employee')
export class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private jobPositionsService: JobPositionsService,
    private candidatesService: CandidatesService,
  ) {}

  //Log-in Register Endpoints

  @Post('/register')
  async register(@Body() v: EmployeeInterface): Promise<any> {
    return await this.employeeService.register(v);
  }

  @Post('/login')
  login(
    @Body('username') username: any,
    @Body('password') password: any,
    @Body('company') company: any,
  ): any {
    const returnValue = this.employeeService.login(username, password, company);
    return returnValue;
  }

  //Employee Job Ad Endpoints

  @Post('/add-position')
  async addPosition(@Body() v: JobPositionsInterface): Promise<any> {
    return await this.jobPositionsService.addPosition(v);
  }

  @Get('/get-positions')
  async getPositions(): Promise<any> {
    return await this.jobPositionsService.getPositions();
  }

  @Get('/get-position/:id')
  async getOnePosition(@Param('id') v: string): Promise<any> {
    return await this.jobPositionsService.getOnePosition(v);
  }

  @Put('/updateEntries/')
  async updateEntries(
    @Body('id') id: string,
    @Body('entries') entries: any,
  ): Promise<any> {
    return await this.jobPositionsService.updateEntries(id, entries);
  }

  //Employee Candidates Endpoints
  @Post('/add-candidate')
  async addCandidate(@Body() v: CandidateInterface): Promise<any> {
    console.log(v);
    return await this.candidatesService.addCandidate(v);
  }

  @Get('/get-candidates')
  async getCandidates(): Promise<any> {
    return await this.candidatesService.getCandidates();
  }

  @Get('/get-candidates/:id')
  async getOneCandidate(@Param('id') v: string): Promise<any> {
    return await this.candidatesService.getOneCandidate(v);
  }

  @Get('/get-test/:id')
  async getTest(@Param('id') v: string): Promise<any> {
    return await this.candidatesService.getonebyname(v);
  }

  @Put('/update-candidate-competency/')
  async updateCompetency(
    @Body('username') username: string,
    @Body('competencies') competencies: any,
  ): Promise<any> {
    return await this.candidatesService.updateCompetencies(
      username,
      competencies,
    );
  }
}
