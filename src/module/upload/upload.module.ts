import { Module } from '@nestjs/common';
import { UploadController } from 'src/controllers/upload/upload.controller';
import { UploadService } from 'src/services/upload/upload.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'), // Absolute path to the folder
            serveRoot: '/uploads', // URL prefix for accessing files
        }),
    ],
    controllers: [UploadController],
    providers: [UploadService],
    exports: [UploadService]
})
export class UploadModule { }
