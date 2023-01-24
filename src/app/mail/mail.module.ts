import { MailEntity } from './mail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailCron } from './cron/mail.cron';

@Module({
  imports: [TypeOrmModule.forFeature([MailEntity])],
  providers: [MailService, MailCron],
  controllers: [MailController],
})
export class MailModule {}
