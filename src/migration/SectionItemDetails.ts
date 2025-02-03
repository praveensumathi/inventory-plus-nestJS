import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { SectionHeaders } from "./SectionHeaders";
import { SectionItems } from "./SectionItems";

@Index("SectionItemDetails_pkey", ["id"], { unique: true })
@Entity("SectionItemDetails", { schema: "public" })
export class SectionItemDetails {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("text", { name: "Value", nullable: true })
  value: string | null;

  @ManyToOne(
    () => SectionHeaders,
    (sectionHeaders) => sectionHeaders.sectionItemDetails
  )
  @JoinColumn([{ name: "SectionHeaderId", referencedColumnName: "id" }])
  sectionHeader: SectionHeaders;

  @ManyToOne(
    () => SectionItems,
    (sectionItems) => sectionItems.sectionItemDetails
  )
  @JoinColumn([{ name: "SectionItemId", referencedColumnName: "id" }])
  sectionItem: SectionItems;
}
