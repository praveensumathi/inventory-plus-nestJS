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

@Index("PK_Client_1", ["id"], { unique: true })
@Entity("Clients", { schema: "dbo" })
export class Clients {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("varchar", { name: "Title", nullable: true, length: 20 })
  title: string | null;

  @AutoMap()
  @Column("varchar", { name: "Name", nullable: true, length: 150 })
  name: string | null;

  @AutoMap()
  @Column("varchar", { name: "Email", nullable: true, length: 100 })
  email: string | null;

  @AutoMap()
  @Column("varchar", { name: "Company", nullable: true, length: 100 })
  company: string | null;

  @AutoMap()
  @Column("varchar", { name: "Telephone", nullable: true, length: 20 })
  telephone: string | null;

  @AutoMap()
  @Column("varchar", { name: "Mobile", nullable: true, length: 20 })
  mobile: string | null;

  @AutoMap()
  @Column("varchar", { name: "Address", nullable: true, length: 3500 })
  address: string | null;

  @AutoMap()
  @Column("varchar", { name: "Website", nullable: true, length: 250 })
  website: string | null;

  @AutoMap()
  @Column("bit", { name: "EmailNotification", nullable: true })
  emailNotification: boolean | null;

  @AutoMap()
  @Column("varchar", { name: "CompanyNo", nullable: true, length: 40 })
  companyNo: string | null;

  @AutoMap()
  @Column("varchar", { name: "Vat", nullable: true, length: 50 })
  vat: string | null;

  @AutoMap()
  @Column("varchar", { name: "BillingEmail", nullable: true, length: 100 })
  billingEmail: string | null;

  @AutoMap()
  @Column("varchar", { name: "LogoUrl", nullable: true, length: 500 })
  logoUrl: string | null;

  @AutoMap()
  @Column("varchar", { name: "AdditionalEmails", nullable: true, length: 2000 })
  additionalEmails: string | null;

  @AutoMap()
  @Column("bit", { name: "ShowInvoice", nullable: true })
  showInvoice: boolean | null;

  @AutoMap()
  @Column("smallint", { name: "DefaultInvoicePayee", nullable: true })
  defaultInvoicePayee: number | null;

  @AutoMap()
  @Column("bit", { name: "ShowIntegrations", nullable: true })
  showIntegrations: boolean | null;

  @AutoMap()
  @Column("bit", { name: "AllowCreateInspection", nullable: true })
  allowCreateInspection: boolean | null;

  @AutoMap()
  @Column("bit", { name: "AllowEditAppointments", nullable: true })
  allowEditAppointments: boolean | null;

  @AutoMap()
  @Column("bit", { name: "ShowClerkInfo", nullable: true })
  showClerkInfo: boolean | null;

  @AutoMap()
  @Column("varchar", { name: "Notes", nullable: true, length: 5000 })
  notes: string | null;

  @AutoMap()
  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @AutoMap()
  @Column("datetime", {
    name: "CreatedDate",
    nullable: true,
    default: () => "getdate()",
  })
  createdDate: Date | null;

  @AutoMap()
  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

  @AutoMap()
  @Column("datetime", {
    name: "ModifiedDate",
    nullable: true,
    default: () => "getdate()",
  })
  modifiedDate: Date | null;

  @ManyToOne(() => Customers, (customers) => customers.clients)
  @JoinColumn([{ name: "CustomerId", referencedColumnName: "id" }])
  customer: Customers;

  @OneToMany(() => Properties, (properties) => properties.client)
  properties: Properties[];
}
