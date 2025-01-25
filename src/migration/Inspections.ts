import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { InspectionContacts } from "./InspectionContacts";
import { Properties } from "./Properties";
import { Sections } from "./Sections";

@Index("PK_Inspection", ["id"], { unique: true })
@Entity("Inspections", { schema: "dbo" })
export class Inspections {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("varchar", { name: "InspectionName", nullable: true, length: 100 })
  inspectionName: string | null;

  @AutoMap()
  @Column("tinyint", { name: "Template", nullable: true })
  template: number | null;

  @AutoMap()
  @Column("tinyint", { name: "InspectionType", nullable: true })
  inspectionType: number | null;

  @AutoMap()
  @Column("tinyint", { name: "LocationOfKeys", nullable: true })
  locationOfKeys: number | null;

  @AutoMap()
  @Column("nchar", { name: "KeyReturnINstruction", nullable: true, length: 10 })
  keyReturnINstruction: string | null;

  @AutoMap()
  @Column("nchar", { name: "Notes", nullable: true, length: 10 })
  notes: string | null;

  @AutoMap()
  @Column("varchar", { name: "State", length: 50, default: () => "(100)" })
  state: string;

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
    (inspectionContacts) => inspectionContacts.inspection
  )
  inspectionContacts: InspectionContacts[];

  @ManyToOne(() => Properties, (properties) => properties.inspections)
  @JoinColumn([{ name: "PropertyId", referencedColumnName: "id" }])
  property: Properties;

  @OneToMany(() => Sections, (sections) => sections.inspection)
  sections: Sections[];
}
