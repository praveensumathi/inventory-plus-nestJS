import { AutoMap } from "@automapper/classes";

export class BaseCustomerDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  phone: string;

  @AutoMap()
  addressLine1: string | null;

  @AutoMap()
  addressLine2: string | null;

  @AutoMap()
  city: string | null;

  @AutoMap()
  county: string | null;

  @AutoMap()
  postCode: string | null;

  @AutoMap()
  country: string | null;
}

export class CreateCustomerDto extends BaseCustomerDto {}
