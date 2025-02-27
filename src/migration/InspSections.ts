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
import { InspSectionHeaders } from "./InspSectionHeaders";
import { InspSectionItems } from "./InspSectionItems";
import { Inspections } from "./Inspections";

@Index("InspSections_pkey", ["id"], { unique: true })
@Entity("InspSections", { schema: "public" })
export class InspSections {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("character varying", { name: "Name", nullable: true, length: 200 })
  name: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "BlockType",
    nullable: true,
    length: 100,
  })
  blockType: string | null;

  @AutoMap()
  @Column("boolean", { name: "HideOnReport", default: () => "false" })
  hideOnReport: boolean;

  @AutoMap()
  @Column("boolean", { name: "SkipReferenceNumber", default: () => "false" })
  skipReferenceNumber: boolean;

  @AutoMap()
  @Column("text", { name: "Status", nullable: true })
  status: string | null;

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
  @Column("uuid", { name: "UUID", nullable: true })
  uuid: string | null;

  @OneToMany(
    () => InspSectionHeaders,
    (inspSectionHeaders) => inspSectionHeaders.inspSection
  )
  inspSectionHeaders: InspSectionHeaders[];

  @OneToMany(
    () => InspSectionItems,
    (inspSectionItems) => inspSectionItems.inspSection
  )
  inspSectionItems: InspSectionItems[];

  @ManyToOne(() => Inspections, (inspections) => inspections.inspSections)
  @JoinColumn([{ name: "InspectionId", referencedColumnName: "id" }])
  inspection: Inspections;
}
