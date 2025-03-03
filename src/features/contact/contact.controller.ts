import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import { ContactService } from "./contact.service";
import {
  ContactCreateResponseDto,
  ContactRequestDto,
} from "./dto/contact.request";
import { CustomResponse } from "src/common/dto/common.response";
import { Request } from "express";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { ContactDataDto, ContactResponseDto } from "./dto/contact.response";

@ApiBearerAuth()
@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post("createContact")
  @ApiOkResponse({ type: ContactCreateResponseDto })
  save(@Req() req: Request, @Body() contactRequestDto: ContactRequestDto) {
    return this.contactService.save(contactRequestDto, req);
  }

  @Get("getContactsByInspectionId/:id")
  @ApiOkResponse({ type: ContactResponseDto })
  getContacts(@Param("id") id: string) {
    return this.contactService.getContactsByInspectionId(id);
  }

  @Delete("deleteByContactId/:id")
  @ApiOkResponse({ type: CustomResponse })
  async delete(@Param("id") contactId: string) {
    return this.contactService.delete(contactId);
  }
}
