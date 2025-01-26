import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class BaseCustomerDto {
  @ApiProperty({ description: "The name of the customer" })
  @AutoMap()
  name: string;

  @ApiProperty({ description: "The phone number of the customer" })
  @AutoMap()
  phone: string;

  @AutoMap()
  @ApiProperty()
  addressLine1: string | null;

  @AutoMap()
  @ApiProperty()
  addressLine2: string | null;

  @AutoMap()
  @ApiProperty()
  city: string | null;

  @AutoMap()
  @ApiProperty()
  county: string | null;

  @AutoMap()
  @ApiProperty()
  postCode: string | null;

  @AutoMap()
  @ApiProperty()
  country: string | null;
}

export class CreateCustomerDto extends BaseCustomerDto {}

export class UpdateCustomerDto extends BaseCustomerDto {
  @ApiProperty({ description: "The unique identifier of the customer" })
  @AutoMap()
  id: string;
}
