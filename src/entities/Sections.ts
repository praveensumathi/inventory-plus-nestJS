import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SectionHeaders } from "./SectionHeaders";
import { Inspections } from "./Inspections";

@Index("PK_Sections", ["id"], { unique: true })
@Entity("Sections", { schema: "dbo" })
export class Sections {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("varchar", { name: "Name", nullable: true, length: 200 })
  name: string | null;

  @Column("varbinary", { name: "BlockType", nullable: true, length: 100 })
  blockType: Buffer | null;

  @Column("varchar", { name: "UUID", nullable: true, length: 100 })
  uuid: string | null;

  @Column("bit", { name: "HideOnReport", default: () => "(0)" })
  hideOnReport: boolean;

  @Column("bit", { name: "SkipReferenceNumber", default: () => "(0)" })
  skipReferenceNumber: boolean;

  @Column("varchar", { name: "Status", nullable: true })
  status: string | null;

  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @Column("datetime", {
    name: "CreatedDate",
    nullable: true,
    default: () => "getdate()",
  })
  createdDate: Date | null;

  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

  @Column("datetime", {
    name: "ModifiedDate",
    nullable: true,
    default: () => "getdate()",
  })
  modifiedDate: Date | null;

  @OneToMany(() => SectionHeaders, (sectionHeaders) => sectionHeaders.section)
  sectionHeaders: SectionHeaders[];

  @ManyToOne(() => Inspections, (inspections) => inspections.sections)
  @JoinColumn([{ name: "InspectionId", referencedColumnName: "id" }])
  inspection: Inspections;
}
