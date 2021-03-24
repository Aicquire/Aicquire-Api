import { Module } from '@nestjs/common';
import { JobseekerService } from './jobseeker.service';
import { JobseekerController } from './jobseeker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from 'src/models/candidate.entity';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AzureStorageModule.withConfig({
      sasKey: process.env.AZURE_STORAGE_SAS_KEY,
      accountName: process.env.AZURE_STORAGE_ACCOUNT,
      containerName: '',
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Candidate]),
  ],
  providers: [JobseekerService],
  controllers: [JobseekerController],
})
export class JobseekerModule {}
