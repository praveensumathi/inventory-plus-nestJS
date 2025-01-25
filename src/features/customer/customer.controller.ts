import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Param,
  Query,
  Get,
} from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { CreateCustomerDto } from "./dto/customer-request";
import { Public } from "src/decorator";
import { JwtAuthGuard } from "../auth/guards";

@ApiBearerAuth()
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post("createCustomer")
  @Public()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.addCustomer(createCustomerDto);
  }

  @Get("getCustomerById")
  @Public()
  async getCustomerByIs(@Param("id") id: number) {
    return await this.customerService.getCustomerById(id);
  }
}
