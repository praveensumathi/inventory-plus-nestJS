import { AutoMap } from "@automapper/classes";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class ClientDto {
  @AutoMap()
  @ApiProperty()
  id?: string;
  @AutoMap()
  @ApiProperty()
  title?: string;
  @AutoMap()
  @ApiProperty()
  name?: string;
  @AutoMap()
  @ApiProperty()
  email?: string;
  @AutoMap()
  @ApiProperty()
  company?: string;
  @AutoMap()
  @ApiProperty()
  telephone?: string;
  @AutoMap()
  @ApiProperty()
  mobile?: string;
  @AutoMap()
  @ApiProperty()
  addressLine1?: string;
  @AutoMap()
  @ApiProperty()
  addressLine2?: string;
  @AutoMap()
  @ApiProperty()
  city?: string;
  @AutoMap()
  @ApiProperty()
  county?: string;
  @AutoMap()
  @ApiProperty()
  postCode?: string;
  @AutoMap()
  @ApiProperty()
  country?: string;
  @AutoMap()
  @ApiProperty()
  website?: string;
  @AutoMap()
  @ApiProperty()
  emailNotification?: boolean;
  @AutoMap()
  @ApiProperty()
  companyNo?: string;
  @AutoMap()
  @ApiProperty()
  vat?: string;
  @AutoMap()
  @ApiProperty()
  billingEmail?: string;
  @AutoMap()
  @ApiProperty()
  logoUrl?: string;
  @AutoMap()
  @ApiProperty()
  additionalEmails?: string;
  @AutoMap()
  @ApiProperty()
  showInvoice?: boolean;
  @AutoMap()
  @ApiProperty()
  defaultInvoicePayee?: number;
  @AutoMap()
  @ApiProperty()
  showIntegrations?: boolean;
  @AutoMap()
  @ApiProperty()
  allowCreateInspection?: boolean;
  @AutoMap()
  @ApiProperty()
  allowEditAppointments?: boolean;
  @ApiProperty()
  showClerkInfo?: boolean;
  @AutoMap()
  @ApiProperty()
  notes?: string;
}
