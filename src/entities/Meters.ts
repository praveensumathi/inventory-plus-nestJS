import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Properties } from "./Properties";

@Index("meters_pkey", ["id"], { unique: true })
@Entity("meters", { schema: "public" })
export class Meters {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "type" })
  type: string;

  @Column("character varying", { name: "location" })
  location: string;

  @Column("character varying", { name: "reading" })
  reading: string;

  @Column("character varying", { name: "supplier", nullable: true })
  supplier: string | null;

  @Column("date", { name: "date" })
  date: string;

  @Column("character varying", { name: "time" })
  time: string;

  @Column("character varying", { name: "serial_no", nullable: true })
  serialNo: string | null;

  @Column("varchar", { name: "attachments", nullable: true, array: true })
  attachments: string[] | null;

  @Column("bigint", { name: "parent_id", nullable: true })
  parentId: string | null;

  @ManyToOne(() => Properties, (properties) => properties.meters, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "property_id", referencedColumnName: "id" }])
  property: Properties;
}
