import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { R2StorageService } from '../../services/upload/upload.service';
import { extname } from 'path';

@Controller('upload')
export class StorageController {
  constructor(private readonly r2StorageService: R2StorageService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const fileBuffer = file.buffer;
    const fileName = `${Date.now()}${extname(file.originalname)}`;
    
    try {
      // Upload to Cloudflare R2
      const fileUrl = await this.r2StorageService.uploadFile(fileBuffer, fileName);
      return { message: 'File uploaded successfully!', url: fileUrl };
    } catch (error) {
      console.error(error);
      return { message: 'File upload failed.', error: error.message };
    }
  }
}
