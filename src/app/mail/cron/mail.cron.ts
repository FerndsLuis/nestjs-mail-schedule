import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class MailCron {
  @Cron(CronExpression.EVERY_10_SECONDS)
  handler() {
    console.log('Falaa');
  }
}
