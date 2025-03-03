import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customers } from "src/entities";
import { Repository } from "typeorm";
import { CreateCustomerDto } from "./dto/customer.request";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CustomerInfoDto } from "./dto/customer.response";
import {
  CustomResponse,
  ResponseFactory,
} from "src/common/dto/common.response";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async addCustomer(
    customerDto: CreateCustomerDto,
  ): Promise<CustomResponse<Customers>> {
    try {
      var customerEntity = this.mapper.map(
        customerDto,
        CreateCustomerDto,
        Customers,
      );

      customerEntity = await this.customerRepository.save(customerEntity);

      if (customerEntity.id == "0") {
        return ResponseFactory.error("Error While Save Customer", 5001);
      }

      return ResponseFactory.success(customerEntity);
    } catch (error) {
      return ResponseFactory.error(error.message);
    }
  }

  async getCustomerById(
    customerId: string,
  ): Promise<CustomResponse<CustomerInfoDto>> {
    try {
      var customerEntity = await this.customerRepository.findOne({
        where: {
          id: customerId,
        },
      });

      var customerInfo = this.mapper.map(
        customerEntity,
        Customers,
        CustomerInfoDto,
      );

      return ResponseFactory.success(customerInfo);
    } catch (error) {
      return ResponseFactory.error(error.message);
    }
  }
}
