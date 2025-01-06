import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Properties } from "./Properties";

@Index("PK_clients", ["id"], { unique: true })
@Entity("clients", { schema: "dbo" })
export class Clients {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("char", { name: "title", nullable: true, length: 10 })
  title: string | null;

  @Column("nvarchar", { name: "name" })
  name: string;

  @Column("nvarchar", { name: "email" })
  email: string;

  @Column("nvarchar", { name: "company", nullable: true })
  company: string | null;

  @Column("nvarchar", { name: "telephone", nullable: true })
  telephone: string | null;

  @Column("nvarchar", { name: "mobile", nullable: true })
  mobile: string | null;

  @Column("nvarchar", { name: "address", nullable: true })
  address: string | null;

  @Column("nvarchar", { name: "website", nullable: true })
  website: string | null;

  @Column("bit", { name: "email_notification", default: () => "(1)" })
  emailNotification: boolean;

  @Column("char", { name: "company_no", nullable: true, length: 40 })
  companyNo: string | null;

  @Column("char", { name: "vat", nullable: true, length: 50 })
  vat: string | null;

  @Column("char", { name: "billing_email", nullable: true, length: 50 })
  billingEmail: string | null;

  @Column("nvarchar", { name: "logo_url", nullable: true })
  logoUrl: string | null;

  @Column("nvarchar", { name: "additional_emails", nullable: true })
  additionalEmails: string | null;

  @Column("bit", { name: "show_invoice_inmenu", default: () => "(0)" })
  showInvoiceInmenu: boolean;

  @Column("smallint", { name: "default_invoice_payee", nullable: true })
  defaultInvoicePayee: number | null;

  @Column("bit", { name: "show_integrations", default: () => "(1)" })
  showIntegrations: boolean;

  @Column("bit", { name: "allow_create_inspection", default: () => "(1)" })
  allowCreateInspection: boolean;

  @Column("bit", { name: "allow_edit_appoinments", default: () => "(1)" })
  allowEditAppoinments: boolean;

  @Column("bit", { name: "show_clerk_info", default: () => "(0)" })
  showClerkInfo: boolean;

  @Column("nvarchar", { name: "notes", nullable: true })
  notes: string | null;

  @Column("bigint", { name: "created_by", nullable: true })
  createdBy: string | null;

  @Column("datetime", { name: "created_at", default: () => "getdate()" })
  createdAt: Date;

  @OneToMany(() => Properties, (properties) => properties.client)
  properties: Properties[];
}
