import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("properties_pkey", ["id"], { unique: true })
@Entity("properties", { schema: "public" })
export class Properties {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("jsonb", { name: "address" })
  address: object;

  @Column("jsonb", { name: "geocoords", nullable: true })
  geocoords: object | null;

  @Column("character varying", {
    name: "furnished",
    nullable: true,
    length: 30,
  })
  furnished: string | null;

  @Column("character varying", { name: "type", nullable: true, length: 100 })
  type: string | null;

  @Column("character varying", {
    name: "detachment",
    nullable: true,
    length: 50,
  })
  detachment: string | null;

  @Column("integer", { name: "no_of_beds", default: () => "0" })
  noOfBeds: number;

  @Column("integer", { name: "no_of_baths", default: () => "0" })
  noOfBaths: number;

  @Column("integer", { name: "no_of_garages", default: () => "0" })
  noOfGarages: number;

  @Column("boolean", { name: "parking", default: () => "false" })
  parking: boolean;

  @Column("boolean", { name: "garden", default: () => "false" })
  garden: boolean;

  @Column("bigint", { name: "client_id", nullable: true })
  clientId: string | null;

  @Column("varchar", { name: "tags", nullable: true, array: true })
  tags: string[] | null;

  @Column("character varying", { name: "uprn", nullable: true })
  uprn: string | null;

  @Column("jsonb", { name: "custom_fields", nullable: true })
  customFields: object | null;

  @Column("character varying", { name: "ref", nullable: true })
  ref: string | null;

  @Column("bigint", { name: "parent_id", nullable: true })
  parentId: string | null;

  @Column("character varying", { name: "notes", nullable: true })
  notes: string | null;
}
