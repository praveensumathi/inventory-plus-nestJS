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
import { InspSections } from "./InspSections";
import { InspectionContacts } from "./InspectionContacts";
import { Properties } from "./Properties";

@Index("Inspections_pkey", ["id"], { unique: true })
@Entity("Inspections", { schema: "public" })
export class Inspections {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("character varying", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @AutoMap()
  @Column("bigint", { name: "Template", nullable: true })
  template: string | null;

  @AutoMap()
  @Column("smallint", { name: "ReportType", nullable: true })
  reportType: number | null;

  @AutoMap()
  @Column("character varying", {
    name: "LocationOfKeys",
    nullable: true,
    length: 255,
  })
  locationOfKeys: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "KeyReturnInstruction",
    nullable: true,
    length: 255,
  })
  keyReturnInstruction: string | null;

  @AutoMap()
  @Column("character varying", { name: "Notes", nullable: true, length: 500 })
  notes: string | null;

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
  @Column("smallint", { name: "InspectionState", default: () => "1" })
  inspectionState: number;

  @OneToMany(() => InspSections, (inspSections) => inspSections.inspection)
  inspSections: InspSections[];

  @OneToMany(
    () => InspectionContacts,
    (inspectionContacts) => inspectionContacts.inspection
  )
  inspectionContacts: InspectionContacts[];

  @ManyToOne(() => Properties, (properties) => properties.inspections)
  @JoinColumn([{ name: "PropertyId", referencedColumnName: "id" }])
  property: Properties;
}
