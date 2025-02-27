import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { SectionTmplHeader } from "./SectionTmplHeader";

@Index("SectionTmpl_pkey", ["id"], { unique: true })
@Entity("SectionTmpl", { schema: "public" })
export class SectionTmpl {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("character varying", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "Description",
    nullable: true,
    length: 150,
  })
  description: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "BlockType",
    nullable: true,
    length: 100,
  })
  blockType: string | null;

  @AutoMap()
  @Column("boolean", { name: "CanAddActions", default: () => "true" })
  canAddActions: boolean;

  @AutoMap()
  @Column("boolean", { name: "HideOnReport", default: () => "false" })
  hideOnReport: boolean;

  @AutoMap()
  @Column("boolean", { name: "SkipReference", default: () => "false" })
  skipReference: boolean;

  @AutoMap()
  @Column("uuid", { name: "UUID", nullable: true })
  uuid: string | null;

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
  @Column("boolean", { name: "isActive", default: () => "true" })
  isActive: boolean;

  @OneToMany(
    () => SectionTmplHeader,
    (sectionTmplHeader) => sectionTmplHeader.sectionTmpl
  )
  sectionTmplHeaders: SectionTmplHeader[];
}
