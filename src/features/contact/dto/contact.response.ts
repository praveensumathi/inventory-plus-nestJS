import { AutoMap } from "@automapper/classes";
import { BaseResponse } from "src/common/dto/common.response";

export class ContactDataDto {
  @AutoMap()
  id: string;
  @AutoMap()
  name: string;
  @AutoMap()
  email: string;
  @AutoMap()
  mobile: string;
  @AutoMap()
  isSignee: boolean;
  @AutoMap()
  notifyConductDate: boolean;
  @AutoMap()
  canDeliverReport: boolean;

  inspectionId: string;
}

export class ContactResponseDto extends BaseResponse {
  data: ContactDataDto[];
}
