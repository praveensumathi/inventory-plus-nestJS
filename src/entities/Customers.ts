import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Clients } from "./Clients";
import { Users } from "./Users";

@Index("PK_Customer", ["id"], { unique: true })
@Entity("Customers", { schema: "dbo" })
export class Customers {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("varchar", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @AutoMap()
  @Column("varchar", { name: "Address", nullable: true, length: 3500 })
  address: string | null;

  @AutoMap()
  @Column("varchar", { name: "Phone", nullable: true, length: 20 })
  phone: string | null;

  @AutoMap()
  @Column("bit", { name: "Active", nullable: true })
  active: boolean | null;

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

  @OneToMany(() => Clients, (clients) => clients.customer)
  clients: Clients[];

  @OneToMany(() => Users, (users) => users.customer)
  users: Users[];
}
