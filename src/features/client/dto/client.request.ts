import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "src/common/dto/common.response";

export class ClientDataDto {
  @AutoMap()
  id?: string;
  @AutoMap()
  title?: string;
  @AutoMap()
  name?: string;
  @AutoMap()
  email?: string;
  @AutoMap()
  company?: string;
  @AutoMap()
  telephone?: string;
  @AutoMap()
  mobile?: string;
  @AutoMap()
  addressLine1?: string;
  @AutoMap()
  addressLine2?: string;
  @AutoMap()
  city?: string;
  @AutoMap()
  county?: string;
  @AutoMap()
  postCode?: string;
  @AutoMap()
  country?: string;
  @AutoMap()
  website?: string;
  @AutoMap()
  emailNotification?: boolean;
  @AutoMap()
  companyNo?: string;
  @AutoMap()
  vat?: string;
  @AutoMap()
  billingEmail?: string;
  @AutoMap()
  logoUrl?: string;
  @AutoMap()
  additionalEmails?: string;
  @AutoMap()
  showInvoice?: boolean;
  @AutoMap()
  defaultInvoicePayee?: number;
  @AutoMap()
  showIntegrations?: boolean;
  @AutoMap()
  allowCreateInspection?: boolean;
  @AutoMap()
  allowEditAppointments?: boolean;
  @AutoMap()
  showClerkInfo?: boolean;
  @AutoMap()
  notes?: string;
}

export class ClientResponseDto extends BaseResponse {
  data: ClientDataDto;
}
