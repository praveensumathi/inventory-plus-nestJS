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
import { SectionHeaders } from "./SectionHeaders";
import { Inspections } from "./Inspections";

@Index("PK_Sections", ["id"], { unique: true })
@Entity("Sections", { schema: "dbo" })
export class Sections {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("varchar", { name: "Name", nullable: true, length: 200 })
  name: string | null;

  @AutoMap()
  @Column("varbinary", { name: "BlockType", nullable: true, length: 100 })
  blockType: Buffer | null;

  @AutoMap()
  @Column("varchar", { name: "UUID", nullable: true, length: 100 })
  uuid: string | null;

  @AutoMap()
  @Column("bit", { name: "HideOnReport", default: () => "(0)" })
  hideOnReport: boolean;

  @AutoMap()
  @Column("bit", { name: "SkipReferenceNumber", default: () => "(0)" })
  skipReferenceNumber: boolean;

  @AutoMap()
  @Column("varchar", { name: "Status", nullable: true })
  status: string | null;

  @AutoMap()
  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @AutoMap()
  @Column("datetime", {
    name: "CreatedDate",
    nullable: true,
    default: () => "getdate()",
  })
  createdDate: Date | null;

  @AutoMap()
  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

  @AutoMap()
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
