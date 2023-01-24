import { SaveMailDto } from './dto/save-mail.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailEntity } from './mail.entity';
import { FindAllMailDto } from './dto/find-mail.dto';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(MailEntity)
    private readonly mailRepository: Repository<MailEntity>,
  ) {}

  async findAll(params?: FindAllMailDto) {
    const query = this.mailRepository.createQueryBuilder('mail');

    if (params?.dueDateLte) {
      query.andWhere('mail.dueDate <= :dueDateLte', { dueDateLte: params.dueDateLte });
    }

    return query.getMany();
  }

  async save(data: SaveMailDto): Promise<MailEntity> {
    return this.mailRepository.save(this.mailRepository.create(data));
  }
}
