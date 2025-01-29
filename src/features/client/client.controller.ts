import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { ClientService } from "./client.service";
import { EmailService } from "src/services/mail/email.service";
import { Public } from "src/decorator";
import { SendSingleEmailModel } from "src/services/mail/model/send-email.model";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";
import { ClientDto } from "./dto/create-client.dto";

@ApiBearerAuth()
@Controller("client")
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly emailService: EmailService,
  ) {}

  @Post("createClient")
  create(@Req() req: Request, @Body() createClientDto: ClientDto) {
    return this.clientService.save(createClientDto, req);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get("getClient/:id")
  findOne(@Param("id") id: string) {
    return this.clientService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clientService.remove(+id);
  }

  @Public()
  @Post("email")
  async sendEmail(): Promise<boolean> {
    const transformedDto: SendSingleEmailModel = {
      toMail: "praveen.r@deventure.co",
      mailSubject: "New client registration",
      template: "welcome",
      data: {
        name: "Praveen",
      },
    };

    return this.emailService.sendEmail(transformedDto);
  }
}
