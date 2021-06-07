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
  Delete,
} from '@nestjs/common';
import { JobseekerService } from './jobseeker.service';
import {
  CandidateEducation,
  CandidateInformation,
  CandidateWorkExperience,
  CandidateCertificatesAndTrainings,
  CandidateAssociations,
  CandidateReferences,
  CandidateSkillsAndLanguages,
  CandidatePortfolio,
  CandidateVideoResponse,
} from 'src/models/candidate.interface';

@Controller('jobseeker')
export class JobseekerController {
  constructor(private jobseekerService: JobseekerService) {}
  @Post('/login')
  login(@Body('username') username: any, @Body('password') password: any): any {
    const returnValue = this.jobseekerService.login(username, password);
    return returnValue;
  }
  // ***********************************************************************
  // Profile
  // ***********************************************************************

  @Put('/update-profile-information/:username')
  async updateProfileInformation(
    @Param('username') username: string,
    @Body() v: CandidateInformation,
  ): Promise<any> {
    return await this.jobseekerService.updateProfileInformation(v, username);
  }

  // ***********************************************************************
  // Work Experience
  // ***********************************************************************

  @Post('/add-work-experience/:username')
  async addWorkExperience(
    @Param('username') username: string,
    @Body() v: CandidateWorkExperience,
  ): Promise<any> {
    return await this.jobseekerService.addWorkExperience(v, username);
  }

  @Put('/update-work-experience/:username')
  async updateWorkExperience(
    @Param('username') username: string,
    @Body() v: CandidateWorkExperience,
  ): Promise<any> {
    return await this.jobseekerService.updateWorkExperience(v, username);
  }

  @Delete('/delete-work-experience/:username')
  async deleteWorkExperience(
    @Param('username') username: string,
    @Body() v: CandidateWorkExperience,
  ): Promise<any> {
    return await this.jobseekerService.deleteWorkExperience(v, username);
  }

  // ***********************************************************************
  // Education
  // ***********************************************************************

  @Post('/add-education/:username')
  async addEducation(
    @Param('username') username: string,
    @Body() v: CandidateEducation,
  ): Promise<any> {
    return await this.jobseekerService.addEducation(v, username);
  }

  @Put('/update-education/:username')
  async updateEducation(
    @Param('username') username: string,
    @Body() v: CandidateEducation,
  ): Promise<any> {
    return await this.jobseekerService.updateEducation(v, username);
  }

  @Delete('/delete-education/:username')
  async deleteEducation(
    @Param('username') username: string,
    @Body() v: CandidateEducation,
  ): Promise<any> {
    return await this.jobseekerService.deleteEducation(v, username);
  }

  // ***********************************************************************
  // Certificates and Trainings
  // ***********************************************************************

  @Post('/add-certificates-and-trainings/:username')
  async addCertificatesAndTrainings(
    @Param('username') username: string,
    @Body() v: CandidateCertificatesAndTrainings,
  ): Promise<any> {
    return await this.jobseekerService.addCertificatesAndTrainings(v, username);
  }

  @Put('/update-certificates-and-trainings/:username')
  async updateCertificatesAndTrainings(
    @Param('username') username: string,
    @Body() v: CandidateCertificatesAndTrainings,
  ): Promise<any> {
    return await this.jobseekerService.updateCertificatesAndTrainings(
      v,
      username,
    );
  }

  @Delete('/delete-certificates-and-trainings/:username')
  async deleteCertificatesAndTrainings(
    @Param('username') username: string,
    @Body() v: CandidateCertificatesAndTrainings,
  ): Promise<any> {
    return await this.jobseekerService.deleteCertificatesAndTrainings(
      v,
      username,
    );
  }

  // ***********************************************************************
  // Associations
  // ***********************************************************************

  @Post('/add-associations/:username')
  async addAssociations(
    @Param('username') username: string,
    @Body() v: CandidateAssociations,
  ): Promise<any> {
    return await this.jobseekerService.addAssociations(v, username);
  }

  @Put('/update-associations/:username')
  async updateAssociations(
    @Param('username') username: string,
    @Body() v: CandidateAssociations,
  ): Promise<any> {
    return await this.jobseekerService.updateAssociations(v, username);
  }

  @Delete('/delete-associations/:username')
  async deleteAssociations(
    @Param('username') username: string,
    @Body() v: CandidateAssociations,
  ): Promise<any> {
    return await this.jobseekerService.deleteAssociations(v, username);
  }

  // ***********************************************************************
  // References
  // ***********************************************************************

  @Post('/add-references/:username')
  async addReferences(
    @Param('username') username: string,
    @Body() v: CandidateReferences,
  ): Promise<any> {
    return await this.jobseekerService.addReferences(v, username);
  }

  @Put('/update-references/:username')
  async updateReferences(
    @Param('username') username: string,
    @Body() v: CandidateReferences,
  ): Promise<any> {
    return await this.jobseekerService.updateReferences(v, username);
  }

  @Delete('/delete-references/:username')
  async deleteReferences(
    @Param('username') username: string,
    @Body() v: CandidateReferences,
  ): Promise<any> {
    return await this.jobseekerService.deleteReferences(v, username);
  }

  // ***********************************************************************
  // Skills and Languages
  // ***********************************************************************

  @Put('/update-skills-and-languages/:username')
  async updateSkillsAndLanguages(
    @Param('username') username: string,
    @Body() v: CandidateSkillsAndLanguages,
  ): Promise<any> {
    return await this.jobseekerService.updateSkillsAndLanguages(v, username);
  }

  // ***********************************************************************
  // Portfolio
  // ***********************************************************************

  @Put('/upload-portfolio/:username')
  async uploadPortfolio(
    @Param('username') username: string,
    @Body() portfolio: CandidatePortfolio,
  ): Promise<any> {
    return await this.jobseekerService.addPortfolio(portfolio, username);
  }

  @Put('/update-portfolio-details/:username')
  async updatePortfolioDetails(
    @Param('username') username: string,
    @Body() portfolio: CandidatePortfolio,
  ): Promise<any> {
    return await this.jobseekerService.updatePortfolioDetails(
      portfolio,
      username,
    );
  }

  @Put('/update-portfolio-details/:username')
  async deletePortfolioFile(
    @Param('username') username: string,
    @Body() portfolio: CandidatePortfolio,
  ): Promise<any> {
    return await this.jobseekerService.updatePortfolioDetails(
      portfolio,
      username,
    );
  }

  // ***********************************************************************
  // Video Response
  // ***********************************************************************

  @Put('/complete-video-response/:username')
  async updateCompetency(@Param('username') username: string): Promise<any> {
    return await this.jobseekerService.completeVideoResponse(username);
  }

  @Put('/add-video-response/:username')
  async updateOneCompetency(
    @Param('username') username: string,
    @Body() videoResponses: CandidateVideoResponse,
  ): Promise<any> {
    return await this.jobseekerService.addVideoResponse(
      username,
      videoResponses,
    );
  }

  @Get('/get-data/:username')
  async getUserData(@Param('username') username: string): Promise<any> {
    return await this.jobseekerService.getData(username);
  }
}
