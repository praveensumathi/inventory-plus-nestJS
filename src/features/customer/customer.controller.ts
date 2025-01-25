import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CreateCustomerDto } from "./dto/customer-request";
import { Public } from "src/decorator";
import { JwtAuthGuard } from "../auth/guards";

@ApiBearerAuth()
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post("create-customer")
  @UseGuards(JwtAuthGuard)
  async createCustomer(
    @Request() req,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    return await this.customerService.addCustomer(req, createCustomerDto);
  }
}
