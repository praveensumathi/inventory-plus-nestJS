import { AutoMap } from "@automapper/classes";

export class ContactResponseDto {
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
