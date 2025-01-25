import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { InspectionContacts } from "./InspectionContacts";

@Index("PK_Contacts", ["id"], { unique: true })
@Entity("Contacts", { schema: "dbo" })
export class Contacts {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("varchar", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @AutoMap()
  @Column("varchar", { name: "Type", nullable: true, length: 50 })
  type: string | null;

  @AutoMap()
  @Column("varchar", { name: "Email", nullable: true, length: 100 })
  email: string | null;

  @AutoMap()
  @Column("varchar", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @AutoMap()
  @Column("bit", { name: "Signee", default: () => "(0)" })
  signee: boolean;

  @AutoMap()
  @Column("bit", { name: "Notify", default: () => "(0)" })
  notify: boolean;

  @AutoMap()
  @Column("bit", { name: "Deliver", default: () => "(0)" })
  deliver: boolean;

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

  @OneToMany(
    () => InspectionContacts,
    (inspectionContacts) => inspectionContacts.contact
  )
  inspectionContacts: InspectionContacts[];
}
