// email.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from 'src/services/mail/mail.service';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
