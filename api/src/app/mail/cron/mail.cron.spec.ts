import { MailService } from '../mail.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MailCron } from './mail.cron';
import { SendgridService } from '../../sendgrid/service/sendgrid.service';
import { MailEntity } from '../mail.entity';

describe('MailCron', () => {
  let mailCron: MailCron;
  let mailService: MailService;
  let sendgridService: SendgridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailCron,
        { provide: MailService, useValue: { findAll: jest.fn(), updateStatus: jest.fn() } },
        { provide: SendgridService, useValue: { sendEmail: jest.fn() } },
      ],
    }).compile();

    mailCron = module.get<MailCron>(MailCron);
    mailService = module.get<MailService>(MailService);
    sendgridService = module.get<SendgridService>(SendgridService);
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
    expect(mailCron).toBeDefined();
    expect(sendgridService).toBeDefined();
  });

  describe('handle', () => {
    it('should sen mail every 10 seconds', async () => {
      // Arrange
      const mailEntityMockList = [
        {
          id: '1',
          dueDate: '2023-02-22T10:00:00-03:00',
        },
        {
          id: '2',
          dueDate: '2023-02-22T18:00:00-03:00',
        },
      ] as MailEntity[];

      jest.spyOn(mailService, 'findAll').mockResolvedValueOnce(mailEntityMockList);
      jest.spyOn(sendgridService, 'sendEmail').mockResolvedValueOnce(true);
      jest.spyOn(mailService, 'updateStatus').mockResolvedValueOnce();

      // Act
      const result = await mailCron.handler();

      // Assert
      expect(result).toBeUndefined();
      expect(mailService.findAll).toBeCalledTimes(1);
      expect(sendgridService.sendEmail).toBeCalledTimes(2);
      expect(mailService.updateStatus).toBeCalledTimes(2);
    });
  });
});
