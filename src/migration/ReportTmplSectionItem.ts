import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { ReportTmpl } from "./ReportTmpl";
import { ReportTmplSection } from "./ReportTmplSection";

@Index("ReportTmplSectionItem_pkey", ["id"], { unique: true })
@Entity("ReportTmplSectionItem", { schema: "public" })
export class ReportTmplSectionItem {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("boolean", { name: "HideOnReport", default: () => "false" })
  hideOnReport: boolean;

  @AutoMap()
  @Column("boolean", { name: "SkipReference", default: () => "false" })
  skipReference: boolean;

  @AutoMap()
  @Column("boolean", { name: "CanAddActions", default: () => "true" })
  canAddActions: boolean;

  @AutoMap()
  @Column("smallint", { name: "Status", default: () => "1" })
  status: number;

  @AutoMap()
  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @AutoMap()
  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

  @AutoMap()
  @Column("time without time zone", {
    name: "CreatedDate",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: string | null;

  @AutoMap()
  @Column("time without time zone", {
    name: "ModifiedDate",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedDate: string | null;

  @AutoMap()
  @Column("bigint", { name: "ReportTmplSectionHeaderId", nullable: true })
  reportTmplSectionHeaderId: string | null;

  @AutoMap()
  @Column("character varying", { name: "Value", nullable: true, length: 5000 })
  value: string | null;

  @ManyToOne(
    () => ReportTmpl,
    (reportTmpl) => reportTmpl.reportTmplSectionItems
  )
  @JoinColumn([{ name: "ReportTmplId", referencedColumnName: "id" }])
  reportTmpl: ReportTmpl;

  @ManyToOne(
    () => ReportTmplSection,
    (reportTmplSection) => reportTmplSection.reportTmplSectionItems
  )
  @JoinColumn([{ name: "ReportTmplSectionId", referencedColumnName: "id" }])
  reportTmplSection: ReportTmplSection;
}
