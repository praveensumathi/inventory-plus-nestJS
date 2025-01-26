import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Customers } from "./Customers";

@Index("PK_Users", ["id"], { unique: true })
@Entity("Users", { schema: "dbo" })
export class Users {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("smallint", { name: "RoleId" })
  roleId: number;

  @AutoMap()
  @Column("varchar", { name: "Title", nullable: true, length: 20 })
  title: string | null;

  @AutoMap()
  @Column("varchar", { name: "Name", nullable: true, length: 250 })
  name: string | null;

  @AutoMap()
  @Column("varchar", { name: "Email", nullable: true, length: 250 })
  email: string | null;

  @AutoMap()
  @Column("varchar", { name: "ProfileUrl", nullable: true, length: 800 })
  profileUrl: string | null;

  @AutoMap()
  @Column("varchar", { name: "Telephone", nullable: true, length: 50 })
  telephone: string | null;

  @AutoMap()
  @Column("varchar", { name: "Mobile", nullable: true, length: 50 })
  mobile: string | null;

  @AutoMap()
  @Column("varchar", { name: "Note", nullable: true })
  note: string | null;

  @AutoMap()
  @Column("bit", { name: "EmailNotification", default: () => "(1)" })
  emailNotification: boolean;

  @AutoMap()
  @Column("bit", { name: "CreateInspection", default: () => "(1)" })
  createInspection: boolean;

  @AutoMap()
  @Column("varchar", { name: "AddressLine1", nullable: true, length: 500 })
  addressLine1: string | null;

  @AutoMap()
  @Column("varchar", { name: "AddressLine2", nullable: true, length: 500 })
  addressLine2: string | null;

  @AutoMap()
  @Column("varchar", { name: "City", nullable: true, length: 100 })
  city: string | null;

  @AutoMap()
  @Column("varchar", { name: "County", nullable: true, length: 100 })
  county: string | null;

  @AutoMap()
  @Column("varchar", { name: "PostCode", nullable: true, length: 50 })
  postCode: string | null;

  @AutoMap()
  @Column("varchar", { name: "Country", nullable: true, length: 200 })
  country: string | null;

  @AutoMap()
  @Column("varchar", { name: "Password", nullable: true, length: 1000 })
  password: string | null;

  @AutoMap()
  @Column("varchar", { name: "Token", nullable: true, length: 3000 })
  token: string | null;

  @AutoMap()
  @Column("bit", { name: "Status", default: () => "(0)" })
  status: boolean;

  @AutoMap()
  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @AutoMap()
  @Column("datetime", {
    name: "CreateDate",
    nullable: true,
    default: () => "getdate()",
  })
  createDate: Date | null;

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

  @ManyToOne(() => Customers, (customers) => customers.users)
  @JoinColumn([{ name: "CustomerId", referencedColumnName: "id" }])
  customer: Customers;
}
