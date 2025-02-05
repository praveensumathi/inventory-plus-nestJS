import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { CustomerMapperProfile } from "src/mapperProfile";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customers } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerMapperProfile],
})
export class CustomerModule {}
