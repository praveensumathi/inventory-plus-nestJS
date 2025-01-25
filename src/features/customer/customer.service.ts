import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customers } from "src/entities";
import { Repository } from "typeorm";
import { CreateCustomerDto } from "./dto/customer-request";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CustomerMapperProfile } from "src/mapperProfile";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async addCustomer(request : Request,customerDto: CreateCustomerDto): Promise<Customers> {
    var customerEntity = this.mapper.map(
      customerDto,
      CreateCustomerDto,
      Customers,
    );
    return customerEntity;
    //return await this.customerRepository.save(customerEntity);
  }
}
