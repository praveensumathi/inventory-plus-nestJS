import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { InspSections } from "./InspSections";
import { InspSectionItems } from "./InspSectionItems";

@Index("InspSectionHeaders_pkey", ["id"], { unique: true })
@Entity("InspSectionHeaders", { schema: "public" })
export class InspSectionHeaders {
  @AutoMap()
  @Column("bigint", { primary: true, name: "Id" })
  id: string;

  @AutoMap()
  @Column("character varying", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @AutoMap()
  @Column("character varying", { name: "Label", nullable: true, length: 100 })
  label: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "PlaceHolder",
    nullable: true,
    length: 100,
  })
  placeHolder: string | null;

  @AutoMap()
  @Column("boolean", { name: "Editable", default: () => "true" })
  editable: boolean;

  @AutoMap()
  @Column("boolean", { name: "Required", default: () => "false" })
  required: boolean;

  @AutoMap()
  @Column("character varying", { name: "Type", nullable: true, length: 200 })
  type: string | null;

  @AutoMap()
  @Column("timestamp without time zone", {
    name: "CratedDate",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  cratedDate: Date | null;

  @AutoMap()
  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @AutoMap()
  @Column("timestamp without time zone", {
    name: "ModifiedDate",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedDate: Date | null;

  @AutoMap()
  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

  @AutoMap()
  @Column("uuid", { name: "UUID", nullable: true })
  uuid: string | null;

  @AutoMap()
  @Column("jsonb", { name: "Source", nullable: true })
  source: object | null;

  @ManyToOne(
    () => InspSections,
    (inspSections) => inspSections.inspSectionHeaders
  )
  @JoinColumn([{ name: "InspSectionId", referencedColumnName: "id" }])
  inspSection: InspSections;

  @OneToMany(
    () => InspSectionItems,
    (inspSectionItems) => inspSectionItems.inspSectionHeader
  )
  inspSectionItems: InspSectionItems[];
}
