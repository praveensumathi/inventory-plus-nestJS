import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { PaginationRequest } from "src/common/dto/pagination.request";

export class BaseUserRequestDto {
  @AutoMap()
  roleId: number;
  @AutoMap()
  title: string;
  @AutoMap()
  name: string;
  @AutoMap()
  email: string;
  @AutoMap()
  telephone?: string;
  @AutoMap()
  mobile: string;
  @AutoMap()
  note?: string;
  @AutoMap()
  emailNotification: boolean;
  @AutoMap()
  createInspection: boolean;
  customerId: string;
  @AutoMap()
  addressLine1: string;
  @AutoMap()
  addressLine2: string;
  @AutoMap()
  city: string;
  @AutoMap()
  county: string;
  @AutoMap()
  postCode: string;
  @AutoMap()
  country: string;

  @ApiProperty({ format: "binary" })
  file: string;
}

export class CreateUserRequestDto extends BaseUserRequestDto {}

export class UpdateUserRequestDto extends BaseUserRequestDto {
  @AutoMap()
  id: string;
}

export class GetUserRequestDto extends PaginationRequest {}
