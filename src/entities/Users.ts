import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { CustomerUsers } from "./CustomerUsers";

@Index("Users_pkey", ["id"], { unique: true })
@Entity("Users", { schema: "public" })
export class Users {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("smallint", { name: "RoleId" })
  roleId: number;

  @AutoMap()
  @Column("character varying", { name: "Title", nullable: true, length: 20 })
  title: string | null;

  @AutoMap()
  @Column("character varying", { name: "Name", nullable: true, length: 250 })
  name: string | null;

  @AutoMap()
  @Column("character varying", { name: "Email", nullable: true, length: 250 })
  email: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "ProfileUrl",
    nullable: true,
    length: 800,
  })
  profileUrl: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "Telephone",
    nullable: true,
    length: 50,
  })
  telephone: string | null;

  @AutoMap()
  @Column("character varying", { name: "Mobile", nullable: true, length: 50 })
  mobile: string | null;

  @AutoMap()
  @Column("character varying", { name: "Note", nullable: true, length: 1000 })
  note: string | null;

  @AutoMap()
  @Column("boolean", { name: "EmailNotification", default: () => "true" })
  emailNotification: boolean;

  @AutoMap()
  @Column("boolean", { name: "CreateInspection", default: () => "true" })
  createInspection: boolean;

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
  @Column("character varying", { name: "Country", nullable: true, length: 200 })
  country: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "Password",
    nullable: true,
    length: 1000,
  })
  password: string | null;

  @AutoMap()
  @Column("character varying", { name: "Token", nullable: true, length: 3000 })
  token: string | null;

  @AutoMap()
  @Column("boolean", { name: "Status", default: () => "false" })
  status: boolean;

  @AutoMap()
  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @AutoMap()
  @Column("timestamp without time zone", {
    name: "CreateDate",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date | null;

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

  @OneToMany(() => CustomerUsers, (customerUsers) => customerUsers.user)
  customerUsers: CustomerUsers[];
}
