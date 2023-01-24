import { SendEmailInterface } from '../interface/send-email.interface';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SendgridService } from './sendgrid.service';
import { of } from 'rxjs';

describe('SendgridService', () => {
  let sendGridService: SendgridService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    sendGridService = module.get<SendgridService>(SendgridService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sendGridService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should sen an email with success', async () => {
      // Arrange - prepara os dados
      const data: SendEmailInterface = {
        personalizations: [
          {
            to: [{ name: 'Luís Destino', email: 'hsantos.luis@outlook.com' }],
          },
        ],
        from: {
          name: 'Luis origem',
          email: 'hsantos.luis10@gmail.com',
        },
        reply_to: {
          name: 'Luis origem',
          email: 'hsantos.luis10@gmail.com',
        },
        subject: 'Fatura chegou',
        content: [{ type: 'text/html', value: '<p>Sua fatura chegou</p>' }],
      };

      jest
        .spyOn(httpService, 'post')
        .mockReturnValueOnce(of({ status: 202, statusText: 'ACCEPTED', config: {}, headers: {}, data: '' }));

      // Act - executa os testes
      const result = await sendGridService.sendEmail(data);
      // Assert - as confirmações
      expect(result).toBeTruthy();
      expect(httpService.post).toBeCalledTimes(1);
    });
  });
});
