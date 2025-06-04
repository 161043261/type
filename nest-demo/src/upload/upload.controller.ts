import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Get,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response as ExpressResponse } from 'express';
import { join } from 'node:path';
import { readdirSync } from 'node:fs';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('sf') //! Single File
  // FileInterceptor 上传单个文件
  // FileInterceptors 上传多个文件
  @UseInterceptors(FileInterceptor('fileEntity'))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return { UploadImage: file.filename };
  }

  @Get('download')
  download(@Res() res: ExpressResponse) {
    const dirpath = join(__dirname, '../assets');
    const filenames = readdirSync(dirpath);
    if (!filenames.length) {
      return res.status(404).send('Files not found');
    }
    const latestFilename = filenames[0];
    const latestFilepath = join(dirpath, latestFilename);
    res.download(latestFilepath);
  }

  @Get('tar')
  downloadTar(@Res() res: ExpressResponse) {
    const dirpath = join(__dirname, '../assets');
    const filenames = readdirSync(dirpath);
    if (!filenames.length) {
      return res.status(404).send('Files not found');
    }
    const latestFilename = filenames[0];
    const latestFilepath = join(dirpath, latestFilename);
    const tarStream = new zip.Stream();
    tarStream.addEntry(latestFilepath);
    res.setHeader('Content-Type', 'application/octet-stream');
    tarStream.pipe(res);
  }
}
