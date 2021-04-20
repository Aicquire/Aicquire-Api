import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AzureStorageFileInterceptor,
  UploadedFileMetadata,
} from '@nestjs/azure-storage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('azure/upload/video')
  @UseInterceptors(
    AzureStorageFileInterceptor('file', null, {
      containerName: 'video',
    }),
  )
  UploadedVideoUsingInterceptor(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    Logger.log(`Storage URL: ${file.storageUrl}`, 'AppController');
    return file.storageUrl;
  }

  @Post('azure/upload/file')
  @UseInterceptors(
    AzureStorageFileInterceptor('file', null, {
      containerName: 'file',
    }),
  )
  UploadedFilesUsingInterceptor(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    Logger.log(`Storage URL: ${file.storageUrl}`, 'AppController');
    return file.storageUrl;
  }

  @Post('azure/upload/image')
  @UseInterceptors(
    AzureStorageFileInterceptor('file', null, {
      containerName: 'images',
    }),
  )
  UploadedImagesUsingInterceptor(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    Logger.log(`Storage URL: ${file.storageUrl}`, 'AppController');
    return file.storageUrl;
  }

  @Post('azure/upload/video-temp')
  @UseInterceptors(
    AzureStorageFileInterceptor('file', null, {
      containerName: 'video-temp',
    }),
  )
  UploadedVideoMp4UsingInterceptor(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    Logger.log(`Storage URL: ${file.storageUrl}`, 'AppController');
    return file.storageUrl;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
}
