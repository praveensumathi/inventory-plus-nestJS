import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Properties } from "./Properties";

@Index("contacts_pkey", ["id"], { unique: true })
@Entity("contacts", { schema: "public" })
export class Contacts {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @Column("character varying", { name: "type", length: 100 })
  type: string;

  @Column("character varying", { name: "email", length: 50 })
  email: string;

  @Column("character varying", { name: "phone", length: 20 })
  phone: string;

  @Column("boolean", { name: "signee", default: () => "false" })
  signee: boolean;

  @Column("boolean", { name: "notify", default: () => "false" })
  notify: boolean;

  @Column("boolean", { name: "deliver", default: () => "false" })
  deliver: boolean;

  @ManyToOne(() => Properties, (properties) => properties.contacts, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "property_id", referencedColumnName: "id" }])
  property: Properties;
}
