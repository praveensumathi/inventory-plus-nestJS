import { Controller, Post, Body, Req } from "@nestjs/common";
import { ClientService } from "./client.service";
import { EmailService } from "src/services/mail/email.service";
import { Cookies, Public } from "src/decorator";
import { SendSingleEmailModel } from "src/services/mail/model/send-email.model";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";
import { ClientDto } from "./dto/create-client.dto";
import { COOKIE_CUSTOMER_ID } from "src/common/constants/constants";
import { PaginationRequest } from "src/common/dto/pagination.request";
import {
  ApiOkCustomResponse,
  ApiOkPaginatedResponse,
} from "src/decorator/response.decorator";
import {
  ClientListDtoResponse,
  ClientPaginationResponse,
} from "./dto/client.response";
import { CustomResponse } from "src/common/dto/common.response";

@ApiBearerAuth()
@Controller("client")
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    // private readonly emailService: EmailService,
  ) {}

  @Post("save")
  @ApiOkCustomResponse(ClientDto, CustomResponse)
  create(
    @Req() req: Request,
    @Cookies(COOKIE_CUSTOMER_ID) customerId: string,
    @Body() createClientDto: ClientDto,
  ) {
    return this.clientService.save(createClientDto, customerId, req);
  }

  @Post("get")
  @ApiOkPaginatedResponse(ClientListDtoResponse, ClientPaginationResponse)
  getClients(@Req() req: Request, @Body() query: PaginationRequest) {
    return this.clientService.getClients(query);
  }

  // @Public()
  // @Post("email")
  // async sendEmail(): Promise<boolean> {
  //   const transformedDto: SendSingleEmailModel = {
  //     toMail: "praveen.r@deventure.co",
  //     mailSubject: "New client registration",
  //     template: "welcome",
  //     data: {
  //       name: "Praveen",
  //     },
  //   };

  //   return this.emailService.sendEmail(transformedDto);
  // }
}
