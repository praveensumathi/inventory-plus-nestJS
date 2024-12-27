import { Column, Entity, Index, OneToMany } from "typeorm";
import { Properties } from "./Properties";

@Index("clients_pkey", ["id"], { unique: true })
@Entity("clients", { schema: "public" })
export class Clients {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("character", { name: "title", nullable: true, length: 10 })
  title: string | null;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "company", nullable: true })
  company: string | null;

  @Column("character varying", { name: "telephone", nullable: true })
  telephone: string | null;

  @Column("character varying", { name: "mobile", nullable: true })
  mobile: string | null;

  @Column("jsonb", { name: "address", nullable: true })
  address: object | null;

  @Column("character varying", { name: "website", nullable: true })
  website: string | null;

  @Column("boolean", { name: "email_notification", default: () => "true" })
  emailNotification: boolean;

  @Column("character", { name: "company_no", nullable: true, length: 40 })
  companyNo: string | null;

  @Column("character", { name: "vat", nullable: true, length: 50 })
  vat: string | null;

  @Column("character", { name: "billing_email", nullable: true, length: 50 })
  billingEmail: string | null;

  @Column("character varying", { name: "logo_url", nullable: true })
  logoUrl: string | null;

  @Column("varchar", { name: "additional_emails", nullable: true, array: true })
  additionalEmails: string[] | null;

  @Column("boolean", { name: "show_invoice_inmenu", default: () => "false" })
  showInvoiceInmenu: boolean;

  @Column("smallint", { name: "default_invoice_payee", nullable: true })
  defaultInvoicePayee: number | null;

  @Column("boolean", { name: "show_integrations", default: () => "true" })
  showIntegrations: boolean;

  @Column("boolean", { name: "allow_create_inspection", default: () => "true" })
  allowCreateInspection: boolean;

  @Column("boolean", { name: "allow_edit_appoinments", default: () => "true" })
  allowEditAppoinments: boolean;

  @Column("boolean", { name: "show_clerk_info", default: () => "false" })
  showClerkInfo: boolean;

  @Column("character varying", { name: "notes", nullable: true })
  notes: string | null;

  @Column("bigint", { name: "created_by", nullable: true })
  createdBy: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @OneToMany(() => Properties, (properties) => properties.client)
  properties: Properties[];
}
