import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Properties } from "./Properties";

@Index("PK_meter", ["id"], { unique: true })
@Entity("meters", { schema: "dbo" })
export class Meters {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("nvarchar", { name: "type" })
  type: string;

  @Column("nvarchar", { name: "location" })
  location: string;

  @Column("nvarchar", { name: "reading" })
  reading: string;

  @Column("nvarchar", { name: "supplier", nullable: true })
  supplier: string | null;

  @Column("date", { name: "date" })
  date: Date;

  @Column("nvarchar", { name: "time" })
  time: string;

  @Column("nvarchar", { name: "serial_no", nullable: true })
  serialNo: string | null;

  @Column("nvarchar", { name: "attachments", nullable: true })
  attachments: string | null;

  @Column("bigint", { name: "parent_id", nullable: true })
  parentId: string | null;

  @Column("bigint", { name: "created_by", nullable: true })
  createdBy: string | null;

  @Column("datetime", { name: "created_at", default: () => "getdate()" })
  createdAt: Date;

  @ManyToOne(() => Properties, (properties) => properties.meters, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "property_id", referencedColumnName: "id" }])
  property: Properties;
}
