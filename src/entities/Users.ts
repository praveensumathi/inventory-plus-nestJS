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
  @Column("varchar", { name: "Telephone", nullable: true, length: 50 })
  telephone: string | null;

  @AutoMap()
  @Column("varchar", { name: "Mobile", nullable: true, length: 50 })
  mobile: string | null;

  @AutoMap()
  @Column("varchar", { name: "Note", nullable: true })
  note: string | null;

  @AutoMap()
  @Column("varchar", { name: "Address", nullable: true })
  address: string | null;

  @AutoMap()
  @Column("bit", { name: "Status", default: () => "(0)" })
  status: boolean;

  @AutoMap()
  @Column("bit", { name: "EmailNotification", nullable: true })
  emailNotification: boolean | null;

  @AutoMap()
  @Column("bit", { name: "CreateInspection", nullable: true })
  createInspection: boolean | null;

  @AutoMap()
  @Column("varchar", { name: "Password", nullable: true, length: 1000 })
  password: string | null;

  @AutoMap()
  @Column("varchar", { name: "Token", nullable: true, length: 3000 })
  token: string | null;

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
