import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customers } from "src/entities";
import { Repository } from "typeorm";
import { CreateCustomerDto } from "./dto/customer-request";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CustomerMapperProfile } from "src/mapperProfile";
import { CustomerInfoDto } from "./dto/customer-response";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async addCustomer(customerDto: CreateCustomerDto): Promise<Customers> {
    var customerEntity = this.mapper.map(
      customerDto,
      CreateCustomerDto,
      Customers,
    );

    return await this.customerRepository.save(customerEntity);
  }

  async getCustomerById(customerId: number): Promise<CustomerInfoDto> {
    var customerEntity = await this.customerRepository.findOne({
      where: {
        id: customerId.toString(),
      },
    });

    return this.mapper.map(customerEntity, Customers, CustomerInfoDto);
  }
}
