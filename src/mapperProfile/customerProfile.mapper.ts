import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { Customers } from "src/entities";
import { CreateCustomerDto } from "src/features/customer/dto/customer.request";
import { CustomerInfoDto } from "src/features/customer/dto/customer.response";

@Injectable()
export class CustomerMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        CreateCustomerDto,
        Customers,
        //forMember((des) => des.id, ignore()),
      );

      createMap(
        mapper,
        Customers,
        CreateCustomerDto,
        //forMember((des) => des.id, ignore()),
      );

      createMap(mapper, Customers, CustomerInfoDto);
    };
  }
}
