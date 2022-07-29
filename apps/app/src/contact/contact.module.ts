import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';

@Module({
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
