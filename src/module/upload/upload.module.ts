import { Module } from '@nestjs/common';
import { StorageController } from 'src/controllers/storage/storage.controller';
import { R2StorageService } from 'src/services/upload/upload.service';

@Module({
  imports: [],
  controllers: [StorageController],
  providers: [R2StorageService],
  exports: [R2StorageService]
})
export class uploadModule {}
