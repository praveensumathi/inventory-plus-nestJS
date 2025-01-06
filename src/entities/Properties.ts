import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contacts } from "./Contacts";
import { Meters } from "./Meters";
import { Clients } from "./Clients";

@Index("PK_property", ["id"], { unique: true })
@Entity("properties", { schema: "dbo" })
export class Properties {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("nvarchar", { name: "address" })
  address: string;

  @Column("nvarchar", { name: "geocoords", nullable: true })
  geocoords: string | null;

  @Column("nvarchar", { name: "furnished", nullable: true, length: 30 })
  furnished: string | null;

  @Column("nvarchar", { name: "type", nullable: true, length: 100 })
  type: string | null;

  @Column("nvarchar", { name: "detachment", nullable: true, length: 50 })
  detachment: string | null;

  @Column("int", { name: "no_of_beds", default: () => "(0)" })
  noOfBeds: number;

  @Column("int", { name: "no_of_baths", default: () => "(0)" })
  noOfBaths: number;

  @Column("int", { name: "no_of_garages", default: () => "(0)" })
  noOfGarages: number;

  @Column("bit", { name: "parking", default: () => "(0)" })
  parking: boolean;

  @Column("bit", { name: "garden", default: () => "(0)" })
  garden: boolean;

  @Column("nvarchar", { name: "uprn", nullable: true })
  uprn: string | null;

  @Column("nvarchar", { name: "custom_fields", nullable: true })
  customFields: string | null;

  @Column("nvarchar", { name: "ref", nullable: true })
  ref: string | null;

  @Column("bigint", { name: "parent_id", nullable: true })
  parentId: string | null;

  @Column("nvarchar", { name: "notes", nullable: true })
  notes: string | null;

  @Column("nvarchar", { name: "tags", nullable: true })
  tags: string | null;

  @Column("smallint", { name: "status", nullable: true, default: () => "(1)" })
  status: number | null;

  @Column("bigint", { name: "created_by", nullable: true })
  createdBy: string | null;

  @Column("datetime", { name: "created_at", default: () => "getdate()" })
  createdAt: Date;

  @OneToMany(() => Contacts, (contacts) => contacts.property)
  contacts: Contacts[];

  @OneToMany(() => Meters, (meters) => meters.property)
  meters: Meters[];

  @ManyToOne(() => Clients, (clients) => clients.properties)
  @JoinColumn([{ name: "client_id", referencedColumnName: "id" }])
  client: Clients;
}
