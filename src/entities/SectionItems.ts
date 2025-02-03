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
import { SectionItemDetails } from "./SectionItemDetails";
import { Sections } from "./Sections";

@Index("SectionItems_pkey", ["id"], { unique: true })
@Entity("SectionItems", { schema: "public" })
export class SectionItems {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("uuid", { name: "UUID", nullable: true })
  uuid: string | null;

  @AutoMap()
  @Column("boolean", { name: "HideOnReport", default: () => "false" })
  hideOnReport: boolean;

  @AutoMap()
  @Column("boolean", { name: "SkipReference", default: () => "false" })
  skipReference: boolean;

  @AutoMap()
  @Column("boolean", { name: "CanConfigureFields", default: () => "false" })
  canConfigureFields: boolean;

  @AutoMap()
  @Column("boolean", { name: "CanAddActions", default: () => "true" })
  canAddActions: boolean;

  @AutoMap()
  @Column("timestamp without time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @AutoMap()
  @Column("smallint", { name: "Status", default: () => "1" })
  status: number;

  @OneToMany(
    () => SectionItemDetails,
    (sectionItemDetails) => sectionItemDetails.sectionItem
  )
  sectionItemDetails: SectionItemDetails[];

  @ManyToOne(() => Sections, (sections) => sections.sectionItems)
  @JoinColumn([{ name: "SectionId", referencedColumnName: "id" }])
  section: Sections;
}
