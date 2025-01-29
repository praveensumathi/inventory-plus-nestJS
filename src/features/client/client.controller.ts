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
import { UpdateUserRequestDto } from "../users/dto/user.request";
import { EmailService } from "src/services/mail/email.service";
import { Public } from "src/decorator";
import { SendSingleEmailModel } from "src/services/mail/model/send-email.model";
import { CreateUpdateClientDto } from "./dto/create-client.dto";

@Controller("client")
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly emailService: EmailService,
  ) { }

  @Post()
  createAndUpdateClient(@Body() createClientDto: CreateUpdateClientDto) {
    return this.clientService.saveClient(createClientDto);
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
