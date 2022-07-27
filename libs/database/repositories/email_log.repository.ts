import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IEmailLogCreate } from '../interfaces/email_log.interface';
import { EmailLog } from '../models/email_log.model';

export class EmailLogRepository {
  constructor(
    @InjectRepository(EmailLog)
    private readonly emailLogRepository: Repository<EmailLog>,
  ) {}

  findOneById(id: number | string) {
    return this.emailLogRepository.findOne(id);
  }

  /**
   * Encontra o log de email mais recente para o usuário
   */
  findLatestByUserId(userId: number | string, type: string) {
    return this.emailLogRepository.findOne({
      where: { user_id: userId, type: type },
      order: { created_at: 'DESC' },
    });
  }

  async create(emailLogInfo: IEmailLogCreate) {
    const emailLog = new EmailLog();
    Object.assign(emailLog, emailLogInfo);

    await this.emailLogRepository.save(emailLog);
  }
}
