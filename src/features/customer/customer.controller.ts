import { Body, Controller, Post, Param, Get } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CreateCustomerDto } from "./dto/customer-request";
import { Public } from "src/decorator";

@ApiBearerAuth()
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post("createCustomer")
  @Public()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.addCustomer(createCustomerDto);
  }

  @Get("getCustomerById/:id")
  @Public()
  async getCustomerByIs(@Param("id") id: number) {
    return await this.customerService.getCustomerById(id);
  }
}
