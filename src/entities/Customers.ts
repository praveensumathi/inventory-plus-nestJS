import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Clients } from "./Clients";
import { Users } from "./Users";

@Index("PK_Customer", ["id"], { unique: true })
@Entity("Customers", { schema: "dbo" })
export class Customers {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("varchar", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "Address", nullable: true, length: 3500 })
  address: string | null;

  @Column("varchar", { name: "Phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("bit", { name: "Active", nullable: true })
  active: boolean | null;

  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @Column("datetime", {
    name: "CreatedDate",
    nullable: true,
    default: () => "getdate()",
  })
  createdDate: Date | null;

  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

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
