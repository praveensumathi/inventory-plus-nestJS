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
  @Column("smallint", { name: "Template", nullable: true })
  template: number | null;

  @AutoMap()
  @Column("smallint", { name: "Type", nullable: true })
  type: number | null;

  @AutoMap()
  @Column("smallint", { name: "LocationOfKeys", nullable: true })
  locationOfKeys: number | null;

  @AutoMap()
  @Column("character", {
    name: "KeyReturnInstruction",
    nullable: true,
    length: 100,
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
