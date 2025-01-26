import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Customers } from "./Customers";
import { Properties } from "./Properties";

@Index("Clients_pkey", ["id"], { unique: true })
@Entity("Clients", { schema: "public" })
export class Clients {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("character varying", { name: "Title", nullable: true, length: 20 })
  title: string | null;

  @AutoMap()
  @Column("character varying", { name: "Name", nullable: true, length: 150 })
  name: string | null;

  @AutoMap()
  @Column("character varying", { name: "Email", nullable: true, length: 100 })
  email: string | null;

  @AutoMap()
  @Column("character varying", { name: "Company", nullable: true, length: 100 })
  company: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "Telephone",
    nullable: true,
    length: 20,
  })
  telephone: string | null;

  @AutoMap()
  @Column("character varying", { name: "Mobile", nullable: true, length: 20 })
  mobile: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "AddressLine1",
    nullable: true,
    length: 500,
  })
  addressLine1: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "AddressLine2",
    nullable: true,
    length: 500,
  })
  addressLine2: string | null;

  @AutoMap()
  @Column("character varying", { name: "City", nullable: true, length: 100 })
  city: string | null;

  @AutoMap()
  @Column("character varying", { name: "County", nullable: true, length: 100 })
  county: string | null;

  @AutoMap()
  @Column("character varying", { name: "PostCode", nullable: true, length: 50 })
  postCode: string | null;

  @AutoMap()
  @Column("character varying", { name: "Country", nullable: true, length: 100 })
  country: string | null;

  @AutoMap()
  @Column("character varying", { name: "Website", nullable: true, length: 250 })
  website: string | null;

  @AutoMap()
  @Column("boolean", { name: "EmailNotification", nullable: true })
  emailNotification: boolean | null;

  @AutoMap()
  @Column("character varying", {
    name: "CompanyNo",
    nullable: true,
    length: 40,
  })
  companyNo: string | null;

  @AutoMap()
  @Column("character varying", { name: "Vat", nullable: true, length: 50 })
  vat: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "BillingEmail",
    nullable: true,
    length: 100,
  })
  billingEmail: string | null;

  @AutoMap()
  @Column("character varying", { name: "LogoUrl", nullable: true, length: 500 })
  logoUrl: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "AdditionalEmails",
    nullable: true,
    length: 2000,
  })
  additionalEmails: string | null;

  @AutoMap()
  @Column("boolean", { name: "ShowInvoice", nullable: true })
  showInvoice: boolean | null;

  @AutoMap()
  @Column("smallint", { name: "DefaultInvoicePayee", nullable: true })
  defaultInvoicePayee: number | null;

  @AutoMap()
  @Column("boolean", { name: "ShowIntegrations", nullable: true })
  showIntegrations: boolean | null;

  @AutoMap()
  @Column("boolean", { name: "AllowCreateInspection", nullable: true })
  allowCreateInspection: boolean | null;

  @AutoMap()
  @Column("boolean", { name: "AllowEditAppointments", nullable: true })
  allowEditAppointments: boolean | null;

  @AutoMap()
  @Column("boolean", { name: "ShowClerkInfo", nullable: true })
  showClerkInfo: boolean | null;

  @AutoMap()
  @Column("character varying", { name: "Notes", nullable: true, length: 5000 })
  notes: string | null;

  @AutoMap()
  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @AutoMap()
  @Column("timestamp without time zone", {
    name: "CreatedDate",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @AutoMap()
  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

  @AutoMap()
  @Column("timestamp without time zone", {
    name: "ModifiedDate",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedDate: Date | null;

  @ManyToOne(() => Customers, (customers) => customers.clients)
  @JoinColumn([{ name: "CustomerId", referencedColumnName: "id" }])
  customer: Customers;

  @OneToMany(() => Properties, (properties) => properties.client)
  properties: Properties[];
}
