import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class BaseCustomerDto {
  @ApiPropertyOptional()
  @ApiProperty({ description: "The unique identifier of the customer" })
  @AutoMap()
  id: number;

  @ApiProperty({ description: "The name of the customer" })
  @AutoMap()
  name: string;

  @ApiProperty({ description: "The phone number of the customer" })
  @AutoMap()
  phone: string;

  @ApiProperty({ description: "The address of the customer" })
  @AutoMap()
  address: string;
}

export class CreateCustomerDto extends BaseCustomerDto {}

export class UpdateCustomerDto extends BaseCustomerDto {}
