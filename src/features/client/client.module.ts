import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from 'src/services/mail/email.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, EmailService],
})
export class ClientModule { }
