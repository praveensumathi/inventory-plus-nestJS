import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customers } from "./Customers";

@Index("PK_Client", ["id"], { unique: true })
@Entity("Users", { schema: "dbo" })
export class Users {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("smallint", { name: "RoleId" })
  roleId: number;

  @Column("varchar", { name: "Title", nullable: true, length: 20 })
  title: string | null;

  @Column("varchar", { name: "Name", nullable: true, length: 250 })
  name: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 250 })
  email: string | null;

  @Column("varchar", { name: "Telephone", nullable: true, length: 50 })
  telephone: string | null;

  @Column("varchar", { name: "Mobile", nullable: true, length: 50 })
  mobile: string | null;

  @Column("varchar", { name: "Note", nullable: true })
  note: string | null;

  @Column("varchar", { name: "Address", nullable: true })
  address: string | null;

  @Column("bit", { name: "Status", nullable: true })
  status: boolean | null;

  @Column("bit", { name: "EmailNotification", nullable: true })
  emailNotification: boolean | null;

  @Column("bit", { name: "CreateInspection", nullable: true })
  createInspection: boolean | null;

  @Column("varchar", { name: "Password", nullable: true, length: 1000 })
  password: string | null;

  @Column("varchar", { name: "Token", nullable: true, length: 3000 })
  token: string | null;

  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @Column("datetime", {
    name: "CreateDate",
    nullable: true,
    default: () => "getdate()",
  })
  createDate: Date | null;

  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

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
