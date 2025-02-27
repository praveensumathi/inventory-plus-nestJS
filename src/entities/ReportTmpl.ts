import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { ReportTmplSection } from "./ReportTmplSection";
import { ReportTmplSectionItem } from "./ReportTmplSectionItem";

@Index("ReportTmpl_pkey", ["id"], { unique: true })
@Entity("ReportTmpl", { schema: "public" })
export class ReportTmpl {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("character varying", { name: "Name", nullable: true, length: 200 })
  name: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "Description",
    nullable: true,
    length: 1000,
  })
  description: string | null;

  @AutoMap()
  @Column("smallint", { name: "Inspection Type", nullable: true })
  inspectionType: number | null;

  @AutoMap()
  @Column("smallint", { name: "PropertyType", nullable: true })
  propertyType: number | null;

  @AutoMap()
  @Column("smallint", { name: "FurnishType", nullable: true })
  furnishType: number | null;

  @AutoMap()
  @Column("smallint", {
    name: "NofBedrooms",
    nullable: true,
    default: () => "0",
  })
  nofBedrooms: number | null;

  @AutoMap()
  @Column("smallint", {
    name: "NofBathrooms",
    nullable: true,
    default: () => "0",
  })
  nofBathrooms: number | null;

  @AutoMap()
  @Column("character varying", { name: "Version", nullable: true, length: 100 })
  version: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "Changelog",
    nullable: true,
    length: 1000,
  })
  changelog: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "Previous Version",
    nullable: true,
    length: 100,
  })
  previousVersion: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "HistoricalChangelog",
    nullable: true,
    length: 5000,
  })
  historicalChangelog: string | null;

  @AutoMap()
  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @AutoMap()
  @Column("time without time zone", {
    name: "CreatedDate",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: string | null;

  @AutoMap()
  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

  @AutoMap()
  @Column("time without time zone", {
    name: "ModifiedDate",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedDate: string | null;

  @OneToMany(
    () => ReportTmplSection,
    (reportTmplSection) => reportTmplSection.reportTmpl
  )
  reportTmplSections: ReportTmplSection[];

  @OneToMany(
    () => ReportTmplSectionItem,
    (reportTmplSectionItem) => reportTmplSectionItem.reportTmpl
  )
  reportTmplSectionItems: ReportTmplSectionItem[];
}
