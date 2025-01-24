import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InspectionContacts } from "./InspectionContacts";
import { Properties } from "./Properties";
import { Sections } from "./Sections";

@Index("PK_Inspection", ["id"], { unique: true })
@Entity("Inspections", { schema: "dbo" })
export class Inspections {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("varchar", { name: "InspectionName", nullable: true, length: 100 })
  inspectionName: string | null;

  @Column("tinyint", { name: "Template", nullable: true })
  template: number | null;

  @Column("tinyint", { name: "InspectionType", nullable: true })
  inspectionType: number | null;

  @Column("tinyint", { name: "LocationOfKeys", nullable: true })
  locationOfKeys: number | null;

  @Column("nchar", { name: "KeyReturnINstruction", nullable: true, length: 10 })
  keyReturnINstruction: string | null;

  @Column("nchar", { name: "Notes", nullable: true, length: 10 })
  notes: string | null;

  @Column("varchar", { name: "State", length: 50, default: () => "(100)" })
  state: string;

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
    (inspectionContacts) => inspectionContacts.inspection
  )
  inspectionContacts: InspectionContacts[];

  @ManyToOne(() => Properties, (properties) => properties.inspections)
  @JoinColumn([{ name: "PropertyId", referencedColumnName: "id" }])
  property: Properties;

  @OneToMany(() => Sections, (sections) => sections.inspection)
  sections: Sections[];
}
