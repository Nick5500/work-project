import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload/files')
  @UseInterceptors(FilesInterceptor('files', 2))
  uploadFile(@UploadedFiles() file: Array<Express.Multer.File>) {
    console.log(file);
  }

  @Post('upload/file')
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads/' }))
  uploadFiles(
    @Body() body,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'text' })
        .addMaxSizeValidator({ maxSize: 1000 })
        .build({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }
}
