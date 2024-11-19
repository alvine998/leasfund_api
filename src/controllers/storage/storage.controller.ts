import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class StorageController {
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new Error('No file uploaded');
    }

    // Handle file upload logic (e.g., saving to S3)
    const fileBuffer = file.buffer;
    const fileName = `${Date.now()}-${file.originalname}`;
    return {
      message: 'File uploaded successfully!',
      fileName,
    };
  }
}
