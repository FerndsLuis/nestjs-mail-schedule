import { SaveMailDto } from './dto/save-mail.dto';
import { MailService } from './mail.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/v1/mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async save(@Body() body: SaveMailDto) {
    return this.mailService.save(body);
  }
}
