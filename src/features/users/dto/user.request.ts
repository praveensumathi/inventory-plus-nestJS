import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from "@nestjs/swagger";
import { PaginationRequest } from "src/common/dto/pagination-request";

export class BaseUserRequestDto {
  @AutoMap()
  @ApiProperty()
  roleId: number;

  @AutoMap()
  @ApiProperty()
  title: string | null;

  @AutoMap()
  @ApiProperty()
  name: string | null;

  @AutoMap()
  @ApiProperty()
  email: string | null;

  @AutoMap()
  @ApiProperty()
  telephone: string | null;

  @AutoMap()
  @ApiProperty()
  mobile: string | null;

  @AutoMap()
  @ApiProperty()
  note: string | null;

  @AutoMap()
  @ApiProperty()
  emailNotification: boolean | null;

  @AutoMap()
  @ApiProperty()
  createInspection: boolean | null;

  @ApiProperty({ required: true })
  customerId: string;

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

export class CreateUserRequestDto extends PartialType(BaseUserRequestDto) { }

export class UpdateUserRequestDto extends PartialType(BaseUserRequestDto) {
  @AutoMap()
  @ApiProperty({ required: true })
  id: string;
}

export class GetUserRequestDto extends PaginationRequest { }