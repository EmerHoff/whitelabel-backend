import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'libs/database/repositories/user.repository';
import { User } from 'libs/database/models/user.model';
import { EmailLog } from 'libs/database/models/email_log.model';
import { EmailLogRepository } from 'libs/database/repositories/email_log.repository';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, EmailLog]), ContactModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, EmailLogRepository],
})
export class UsersModule {}
