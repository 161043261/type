import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'node:path';
import { Request as ExpressRequest } from 'express';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../assets'),
        filename: (
          req: ExpressRequest,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          return callback(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
