import { SaveMailDto } from './dto/save-mail.dto';
import { MailEntity } from './mail.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailService } from './mail.service';
import { Repository } from 'typeorm';
import { FindAllMailDto } from './dto/find-mail.dto';
import { MailStatusEnum } from './enum/mail-status.enum';

describe('MailService', () => {
  let mailService: MailService;
  let mailRepository: Repository<MailEntity>;

  const getMany = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: getRepositoryToken(MailEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnThis(),
            andWhere: jest.fn(),
            getMany,
            findOneByOrFail: jest.fn(),
            merge: jest.fn(),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailRepository = module.get<Repository<MailEntity>>(getRepositoryToken(MailEntity));
  });

  afterEach(() => {
    getMany.mockRestore();
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
    expect(mailRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('shoud return a mail list with sucess', async () => {
      // Arange
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
      getMany.mockReturnValueOnce(mailEntityMockList);

      // Act
      const result = await mailService.findAll();

      // Assert
      expect(result).toHaveLength(2);
    });

    it('shoud return a filtered mail list with dueDate', async () => {
      // Arange
      const params: Partial<FindAllMailDto> = { dueDateLte: '2023-02-22T10:00:00Z' };
      const mailEntityMockList = [
        {
          id: '1',
          dueDate: '2023-02-25T10:00:00Z',
        },
      ] as MailEntity[];
      getMany.mockReturnValueOnce(mailEntityMockList);

      // Act
      const result = await mailService.findAll(params);

      // Assert
      expect(result).toHaveLength(1);
    });

    it('shoud return a filtered mail list with WAITING status', async () => {
      // Arange
      const params: Partial<FindAllMailDto> = { status: MailStatusEnum.WAITING };
      const mailEntityMockList = [
        {
          id: '1',
          dueDate: '2023-02-25T10:00:00Z',
        },
      ] as MailEntity[];
      getMany.mockReturnValueOnce(mailEntityMockList);

      // Act
      const result = await mailService.findAll(params);

      // Assert
      expect(result).toHaveLength(1);
    });
  });

  describe('save', () => {
    it('should sabe a new mail with success', async () => {
      // arrange
      const data: SaveMailDto = {
        destinationName: 'Username',
        destinationAddress: 'user@gmail.com',
        dueDate: '2023-01-24T07:00:00Z',
        subject: 'Email teste',
        body: '<p>Teste</p>',
      };

      const mailEntityMock = {
        destinationName: 'Username',
        destinationAddress: 'user@gmail.com',
        dueDate: '2023-01-24T07:00:00Z',
        subject: 'Email teste',
        body: '<p>Teste</p>',
      } as MailEntity;

      jest.spyOn(mailRepository, 'create').mockReturnValueOnce(mailEntityMock);
      jest.spyOn(mailRepository, 'save').mockResolvedValueOnce(mailEntityMock);
      // act
      const result = await mailService.save(data);

      // assert
      expect(result).toBeDefined();
      expect(mailRepository.create).toBeCalledTimes(1);
      expect(mailRepository.save).toBeCalledTimes(1);
    });
  });

  describe('update status', () => {
    it('should update mail status with success', async () => {
      //Arrange
      const id = '1';
      //Act
      const result = await mailService.updateStatus(id, MailStatusEnum.SENT);
      //Assert
      expect(result).toBeUndefined;
    });
  });
});
