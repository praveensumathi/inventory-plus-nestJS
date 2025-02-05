import { Body, Controller, Post, Req } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactRequestDto } from './dto/contact.request';
import { ApiOkCustomResponse } from 'src/decorator/response.decorator';
import { CustomResponse } from 'src/common/dto/common.response';
import { Request } from "express";
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }
  
    @Post("createContact")
    @ApiOkCustomResponse(ContactRequestDto, CustomResponse)
    save(@Req() req: Request, @Body() contactRequestDto: ContactRequestDto) {
      return this.contactService.save(contactRequestDto, req);
    }
}
