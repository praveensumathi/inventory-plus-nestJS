import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Properties } from "./Properties";

@Index("PK_contact", ["id"], { unique: true })
@Entity("contacts", { schema: "dbo" })
export class Contacts {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("nvarchar", { name: "name", length: 100 })
  name: string;

  @Column("nvarchar", { name: "type", length: 100 })
  type: string;

  @Column("nvarchar", { name: "email", length: 50 })
  email: string;

  @Column("nvarchar", { name: "phone", length: 20 })
  phone: string;

  @Column("bit", { name: "signee", default: () => "(0)" })
  signee: boolean;

  @Column("bit", { name: "notify", default: () => "(0)" })
  notify: boolean;

  @Column("bit", { name: "deliver", default: () => "(0)" })
  deliver: boolean;

  @Column("bigint", { name: "created_by", nullable: true })
  createdBy: string | null;

  @Column("datetime", { name: "created_at", default: () => "getdate()" })
  createdAt: Date;

  @ManyToOne(() => Properties, (properties) => properties.contacts, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "property_id", referencedColumnName: "id" }])
  property: Properties;
}
