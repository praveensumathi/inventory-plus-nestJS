import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { InspSectionHeaders } from "./InspSectionHeaders";
import { InspSections } from "./InspSections";

@Index("InspSectionItems_pkey", ["id"], { unique: true })
@Entity("InspSectionItems", { schema: "public" })
export class InspSectionItems {
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

  @AutoMap()
  @Column("character varying", { name: "Value", nullable: true, length: 5000 })
  value: string | null;

  @ManyToOne(
    () => InspSectionHeaders,
    (inspSectionHeaders) => inspSectionHeaders.inspSectionItems
  )
  @JoinColumn([{ name: "InspSectionHeaderId", referencedColumnName: "id" }])
  inspSectionHeader: InspSectionHeaders;

  @ManyToOne(
    () => InspSections,
    (inspSections) => inspSections.inspSectionItems
  )
  @JoinColumn([{ name: "InspSectionId", referencedColumnName: "id" }])
  inspSection: InspSections;
}
