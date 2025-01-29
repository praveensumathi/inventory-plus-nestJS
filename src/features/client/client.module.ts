import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { EmailService } from 'src/services/mail/email.service';
import { Clients } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Clients])],
  controllers: [ClientController],
  providers: [ClientService, EmailService],
})
export class ClientModule { }
