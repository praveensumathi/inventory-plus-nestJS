import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Sections } from "./Sections";

@Index("PK_SectionHeaders", ["id"], { unique: true })
@Entity("SectionHeaders", { schema: "dbo" })
export class SectionHeaders {
  @Column("bigint", { primary: true, name: "Id" })
  id: string;

  @Column("varchar", { name: "UUID", nullable: true, length: 100 })
  uuid: string | null;

  @Column("varchar", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "Label", nullable: true, length: 100 })
  label: string | null;

  @Column("varbinary", { name: "PlaceHolder", nullable: true, length: 300 })
  placeHolder: Buffer | null;

  @Column("bit", { name: "Editable", default: () => "(1)" })
  editable: boolean;

  @Column("bit", { name: "Required", default: () => "(0)" })
  required: boolean;

  @Column("varchar", { name: "Type", nullable: true, length: 200 })
  type: string | null;

  @Column("varchar", { name: "Source", nullable: true })
  source: string | null;

  @Column("datetime", {
    name: "CratedDate",
    nullable: true,
    default: () => "getdate()",
  })
  cratedDate: Date | null;

  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @Column("datetime", {
    name: "ModifiedDate",
    nullable: true,
    default: () => "getdate()",
  })
  modifiedDate: Date | null;

  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

  @ManyToOne(() => Sections, (sections) => sections.sectionHeaders)
  @JoinColumn([{ name: "SectionId", referencedColumnName: "id" }])
  section: Sections;
}
