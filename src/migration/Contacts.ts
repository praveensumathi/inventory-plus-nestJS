import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InspectionContacts } from "./InspectionContacts";

@Index("PK_Contacts", ["id"], { unique: true })
@Entity("Contacts", { schema: "dbo" })
export class Contacts {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("varchar", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "Type", nullable: true, length: 50 })
  type: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 100 })
  email: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("bit", { name: "Signee", default: () => "(0)" })
  signee: boolean;

  @Column("bit", { name: "Notify", default: () => "(0)" })
  notify: boolean;

  @Column("bit", { name: "Deliver", default: () => "(0)" })
  deliver: boolean;

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

  @OneToMany(
    () => InspectionContacts,
    (inspectionContacts) => inspectionContacts.contact
  )
  inspectionContacts: InspectionContacts[];
}
