import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class R2StorageService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: 'https://811cd5573d86cf72e33b4e33b54faa71.r2.cloudflarestorage.com', // Replace with your Cloudflare R2 endpoint
      accessKeyId: process.env.R2_ACCESS_KEY, // Use environment variables for security
      secretAccessKey: process.env.R2_SECRET_KEY, // Use environment variables for security
      region: 'auto',
    });
  }

  async uploadFile(fileBuffer: Buffer, fileName: string): Promise<string> {
    const params = {
      Bucket: process.env.R2_BUCKET_NAME, // Replace with your bucket name
      Key: fileName,
      Body: fileBuffer,
      ContentType: 'image/jpeg', // Adjust based on your file type
      ACL: 'public-read', // Optional: Make file publicly readable
    };

    const uploadResult = await this.s3.upload(params).promise();
    return uploadResult.Location; // Return the file URL
  }
}
