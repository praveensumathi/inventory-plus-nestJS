import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Customers } from "./Customers";
import { Users } from "./Users";

@Index("CustomerUsers_pkey", ["id"], { unique: true })
@Entity("CustomerUsers", { schema: "public" })
export class CustomerUsers {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @ManyToOne(() => Customers, (customers) => customers.customerUsers)
  @JoinColumn([{ name: "CustomerId", referencedColumnName: "id" }])
  customer: Customers;

  @ManyToOne(() => Users, (users) => users.customerUsers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
