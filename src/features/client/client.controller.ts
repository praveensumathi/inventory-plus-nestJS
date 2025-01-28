import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { UpdateUserRequestDto } from "../users/dto/user.request";
import { SendEmailDto } from "src/services/mail/dto/send-email.dto";
import { EmailService } from "src/services/mail/email.service";
import { Public } from "src/decorator";

@Controller("client")
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly emailService: EmailService,
  ) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateClientDto: UpdateUserRequestDto,
  ) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clientService.remove(+id);
  }

  @Public()
  @Post("email")
  async sendEmail(@Body() sendEmailDto: SendEmailDto): Promise<string> {


    const transformedDto: SendEmailDto = {
      ...sendEmailDto,
      toMail: "kumuthac23@gmail.com",
      mailSubject: "New client registration",
      template: "welcome",
    };

    return this.emailService.sendEmail(transformedDto);
  }
}
