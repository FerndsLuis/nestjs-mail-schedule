import { MailStatusEnum } from '../enum/mail-status.enum';

export class FindAllMailDto {
  dueDateLte: string; //lower than icon
  status: MailStatusEnum;
}
