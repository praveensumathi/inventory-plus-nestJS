import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
  MappingProfile,
} from "@automapper/core";
import { Customers } from "src/entities";
import { CreateCustomerDto } from "src/features/customer/dto/customer-request";

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
    };
  }
}
