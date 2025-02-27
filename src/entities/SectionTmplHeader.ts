import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { SectionTmpl } from "./SectionTmpl";

@Index("SectionTmplHeader_pkey", ["id"], { unique: true })
@Entity("SectionTmplHeader", { schema: "public" })
export class SectionTmplHeader {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("character varying", { name: "Label", nullable: true, length: 100 })
  label: string | null;

  @AutoMap()
  @Column("character varying", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "Placeholder",
    nullable: true,
    length: 200,
  })
  placeholder: string | null;

  @AutoMap()
  @Column("jsonb", { name: "Source", nullable: true })
  source: object | null;

  @AutoMap()
  @Column("character varying", { name: "Type", nullable: true, length: 80 })
  type: string | null;

  @AutoMap()
  @Column("uuid", { name: "UUID", nullable: true })
  uuid: string | null;

  @AutoMap()
  @Column("boolean", { name: "IsRequired", default: () => "false" })
  isRequired: boolean;

  @AutoMap()
  @Column("boolean", { name: "IsEditable", default: () => "true" })
  isEditable: boolean;

  @AutoMap()
  @Column("boolean", { name: "IsActive", default: () => "true" })
  isActive: boolean;

  @AutoMap()
  @Column("smallint", { name: "OrderPosition", nullable: true })
  orderPosition: number | null;

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

  @ManyToOne(() => SectionTmpl, (sectionTmpl) => sectionTmpl.sectionTmplHeaders)
  @JoinColumn([{ name: "SectionTmplId", referencedColumnName: "id" }])
  sectionTmpl: SectionTmpl;
}
