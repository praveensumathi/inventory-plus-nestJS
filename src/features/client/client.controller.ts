import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
} from "@nestjs/common";
import { ClientService } from "./client.service";
import { UpdateUserRequestDto } from "../users/dto/user.request";
import { EmailService } from "src/services/mail/email.service";
import { Public } from "src/decorator";
import { SendSingleEmailModel } from "src/services/mail/model/send-email.model";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CreateClientDto } from "./dto/create-client.dto";
import { Request } from "express";

@ApiBearerAuth()
@Controller("client")
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly emailService: EmailService,
  ) {}

  @Post("createClient")
  create(@Req() req: Request, @Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto, req);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get("getClient/:id")
  findOne(@Param("id") id: string) {
    return this.clientService.findOne(+id);
  }

  @Put("updateClient/:id")
  update(
    @Param("id") id: string,
    @Body() updateClientDto: UpdateUserRequestDto,
    @Req() req: Request,
  ) {
    return this.clientService.update(id, updateClientDto, req);
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
