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
  @Column("character varying", { name: "Email", nullable: true, length: 100 })
  email: string | null;

  @AutoMap()
  @Column("character varying", { name: "Mobile", nullable: true, length: 20 })
  mobile: string | null;

  @AutoMap()
  @Column("boolean", { name: "IsSignee", default: () => "false" })
  isSignee: boolean;

  @AutoMap()
  @Column("boolean", { name: "NotifyConductDate", default: () => "false" })
  notifyConductDate: boolean;

  @AutoMap()
  @Column("boolean", { name: "CanDeliverReport", default: () => "false" })
  canDeliverReport: boolean;

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
  @Column("character varying", { name: "Title", nullable: true, length: 10 })
  title: string | null;

  @AutoMap()
  @Column("character varying", { name: "Telephone", nullable: true })
  telephone: string | null;

  @AutoMap()
  @Column("character varying", { name: "Note", nullable: true, length: 500 })
  note: string | null;

  @OneToMany(
    () => InspectionContacts,
    (inspectionContacts) => inspectionContacts.contact,
  )
  inspectionContacts: InspectionContacts[];
}
