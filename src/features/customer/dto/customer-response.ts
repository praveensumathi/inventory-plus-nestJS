import { BaseCustomerDto } from "./customer-request";
import { AutoMap } from "@automapper/classes";

export class CustomerInfoDto extends BaseCustomerDto {
  @AutoMap()
  id: number;
}
