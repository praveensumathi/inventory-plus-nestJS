import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contacts, Inspections } from 'src/entities';
import { InspectionContacts } from 'src/entities/InspectionContacts';
import { ContactMapperProfile } from 'src/mapperProfile/contactProfile.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Contacts, Inspections, InspectionContacts])],
  controllers: [ContactController],
  providers: [ContactService, ContactMapperProfile],
})
export class ContactModule {}
