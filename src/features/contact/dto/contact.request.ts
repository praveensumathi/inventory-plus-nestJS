import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "src/common/dto/common.response";

export class ContactRequestDto {
  @AutoMap()
  @ApiProperty({ default: "0" })
  id: string;

  @AutoMap()
  name?: string;

  @AutoMap()
  email?: string;

  @AutoMap()
  mobile?: string;

  @AutoMap()
  isSignee?: boolean;

  @AutoMap()
  notifyConductDate?: boolean;

  @AutoMap()
  canDeliverReport?: boolean;

  @AutoMap()
  title?: string;

  @AutoMap()
  telephone?: string;

  @AutoMap()
  note?: string;

  inspectionId: string;
}

export class ContactCreateResponseDto extends BaseResponse {
  data: ContactRequestDto;
}
