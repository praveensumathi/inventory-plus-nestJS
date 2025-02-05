import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacts, Inspections } from 'src/entities';
import { Repository } from 'typeorm';
import { ContactRequestDto } from './dto/contact.request';
import { Request } from "express";
import { CustomResponse, ResponseFactory } from 'src/common/dto/common.response';
import { NEW_ENTITY_ID } from 'src/common/constants/constants';
import { getLoggedInUserId } from 'src/common/utils';
import { InspectionContacts } from 'src/entities/InspectionContacts';
import { ContactResponseDto } from './dto/contact.response';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contacts)
        private readonly contactsRepo: Repository<Contacts>,
        @InjectRepository(InspectionContacts)
        private readonly inspectionContactsRepo: Repository<InspectionContacts>,
        @InjectMapper()
        private readonly mapper: Mapper,
    ) { }

    async save(
        contactDto: ContactRequestDto,
        req: Request,
    ): Promise<CustomResponse<ContactRequestDto>> {
        try {
            let contactEntity = await this.contactsRepo.findOneBy({
                id: contactDto.id,
            });

            if (contactEntity == null && contactDto.id != NEW_ENTITY_ID) {
                return ResponseFactory.error("Contact Not Found");
            }

            var loggedInUserId = getLoggedInUserId(req);

            if (contactDto.id == NEW_ENTITY_ID) {
                contactEntity = this.mapper.map(
                    contactDto,
                    ContactRequestDto,
                    Contacts,
                );
                contactEntity.createdBy = loggedInUserId;
            } else {
                this.mapper.mutate(
                    contactDto,
                    contactEntity,
                    ContactRequestDto,
                    Contacts,
                );
                contactEntity.modifiedBy = loggedInUserId;
            }

            // Save the contact entity
            contactEntity = await this.contactsRepo.save(contactEntity);
            contactDto.id = contactEntity.id;

            // Now save to inspectionContactsRepo
            let inspectionContactEntity = new InspectionContacts();
            inspectionContactEntity.contact = contactEntity;
            inspectionContactEntity.inspection = { id: contactDto.inspectionId } as Inspections;

            await this.inspectionContactsRepo.save(inspectionContactEntity);

            return ResponseFactory.success(contactDto);
        } catch (error) {
            console.error("Error saving property:", error);
            return ResponseFactory.error(error.message);
        }
    }

    async getContactsByInspectionId(
        inspectionId: string,
    ): Promise<CustomResponse<ContactResponseDto[]>> {
        try {
            const inspectionContacts = await this.inspectionContactsRepo.find({
                where: {
                    inspection: { id: inspectionId },
                },
                relations: { contact: true },
                select: { contact: { id: true, name: true, email: true, telephone: true, isSignee: true } },
            });
            console.log("inspectionContacts:", inspectionContacts);

            const contacts = inspectionContacts.map(ic => this.mapper.map(ic.contact, Contacts, ContactResponseDto));

            return ResponseFactory.success(contacts);
        } catch (error) {
            console.error("Error fetching contacts:", error);
            return ResponseFactory.error(`Error fetching contacts: ${error.message}`, 500);
        }
    }



}
