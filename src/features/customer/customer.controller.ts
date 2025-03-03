import { Body, Controller, Post, Param, Get } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { CreateCustomerDto } from "./dto/customer.request";
import { Public } from "src/decorator";

@ApiBearerAuth()
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post("create")
  @Public()
  @ApiOkResponse({ type: CreateCustomerDto })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    var { data } = await this.customerService.addCustomer(createCustomerDto);
    return { ...data, id: data.id.toString() } as CreateCustomerDto;
  }

  @Get("getCustomerById/:id")
  @Public()
  async getCustomerById(@Param("id") id: string) {
    return await this.customerService.getCustomerById(id);
  }
}
