import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Clients } from "./Clients";
import { CustomerUsers } from "./CustomerUsers";

@Index("Customers_pkey", ["id"], { unique: true })
@Entity("Customers", { schema: "public" })
export class Customers {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("character varying", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @AutoMap()
  @Column("character varying", { name: "Phone", nullable: true, length: 20 })
  phone: string | null;

  @AutoMap()
  @Column("boolean", { name: "Active", nullable: true, default: () => "true" })
  active: boolean | null;

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

  @OneToMany(() => Clients, (clients) => clients.customer)
  clients: Clients[];

  @OneToMany(() => CustomerUsers, (customerUsers) => customerUsers.customer)
  customerUsers: CustomerUsers[];
}
