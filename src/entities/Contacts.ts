import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { InspectionContacts } from "./InspectionContacts";

@Index("Contacts_pkey", ["id"], { unique: true })
@Entity("Contacts", { schema: "public" })
export class Contacts {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("character varying", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @AutoMap()
  @Column("character varying", { name: "Type", nullable: true, length: 50 })
  type: string | null;

  @AutoMap()
  @Column("character varying", { name: "Email", nullable: true, length: 100 })
  email: string | null;

  @AutoMap()
  @Column("character varying", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @AutoMap()
  @Column("boolean", { name: "Signee", default: () => "false" })
  signee: boolean;

  @AutoMap()
  @Column("boolean", { name: "Notify", default: () => "false" })
  notify: boolean;

  @AutoMap()
  @Column("boolean", { name: "Deliver", default: () => "false" })
  deliver: boolean;

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

  @OneToMany(
    () => InspectionContacts,
    (inspectionContacts) => inspectionContacts.contact
  )
  inspectionContacts: InspectionContacts[];
}
