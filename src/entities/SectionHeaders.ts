import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Sections } from "./Sections";

@Index("SectionHeaders_pkey", ["id"], { unique: true })
@Entity("SectionHeaders", { schema: "public" })
export class SectionHeaders {
  @AutoMap()
  @Column("bigint", { primary: true, name: "Id" })
  id: string;

  @AutoMap()
  @Column("character varying", { name: "UUID", nullable: true, length: 100 })
  uuid: string | null;

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
  @Column("text", { name: "Source", nullable: true })
  source: string | null;

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

  @ManyToOne(() => Sections, (sections) => sections.sectionHeaders)
  @JoinColumn([{ name: "SectionId", referencedColumnName: "id" }])
  section: Sections;
}
