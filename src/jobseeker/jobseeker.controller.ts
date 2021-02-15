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
import { JobseekerService } from './jobseeker.service';

@Controller('jobseeker')
export class JobseekerController {
  constructor(private jobseekerService: JobseekerService) {}
  @Post('/login')
  login(@Body('username') username: any, @Body('password') password: any): any {
    const returnValue = this.jobseekerService.login(username, password);
    return returnValue;
  }

  @Put('/add-video-response/')
  async updateCompetency(
    @Body('username') username: string,
    @Body('videoResponses') videoResponses: any,
  ): Promise<any> {
    return await this.jobseekerService.addVideoResponse(
      username,
      videoResponses,
    );
  }
}
