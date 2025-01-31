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
import { Inspections } from "./Inspections";
import { Clients } from "./Clients";

@Index("Properties_pkey", ["id"], { unique: true })
@Entity("Properties", { schema: "public" })
export class Properties {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("character varying", {
    name: "ReferenceNo",
    nullable: true,
    length: 50,
  })
  referenceNo: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "AddressLine1",
    nullable: true,
    length: 500,
  })
  addressLine1: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "AddressLine2",
    nullable: true,
    length: 500,
  })
  addressLine2: string | null;

  @AutoMap()
  @Column("character varying", { name: "City", nullable: true, length: 100 })
  city: string | null;

  @AutoMap()
  @Column("character varying", { name: "County", nullable: true, length: 100 })
  county: string | null;

  @AutoMap()
  @Column("character varying", { name: "PostCode", nullable: true, length: 50 })
  postCode: string | null;

  @AutoMap()
  @Column("character varying", { name: "Country", nullable: true, length: 100 })
  country: string | null;

  @AutoMap()
  @Column("character varying", { name: "Latitude", nullable: true, length: 50 })
  latitude: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "Longitude",
    nullable: true,
    length: 50,
  })
  longitude: string | null;

  @AutoMap()
  @Column("smallint", { name: "NoOfBeds", default: () => "0" })
  noOfBeds: number;

  @AutoMap()
  @Column("smallint", { name: "NoOfBaths", default: () => "0" })
  noOfBaths: number;

  @AutoMap()
  @Column("smallint", { name: "NoOfGarages", default: () => "0" })
  noOfGarages: number;

  @AutoMap()
  @Column("boolean", { name: "HasParking", default: () => "false" })
  hasParking: boolean;

  @AutoMap()
  @Column("boolean", { name: "HasGarden", default: () => "false" })
  hasGarden: boolean;

  @AutoMap()
  @Column("character varying", { name: "UPRN", nullable: true, length: 100 })
  uprn: string | null;

  @AutoMap()
  @Column("bigint", { name: "ParentPropertyId", nullable: true })
  parentPropertyId: string | null;

  @AutoMap()
  @Column("character varying", { name: "notes", nullable: true, length: 500 })
  notes: string | null;

  @AutoMap()
  @Column("character varying", {
    name: "EPCRating",
    nullable: true,
    length: 50,
  })
  epcRating: string | null;

  @AutoMap()
  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @AutoMap()
  @Column("timestamp without time zone", {
    name: "CreatedDate",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @AutoMap()
  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

  @AutoMap()
  @Column("timestamp without time zone", {
    name: "ModifiedDate",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedDate: Date | null;

  @AutoMap()
  @Column("boolean", { name: "IsActive", default: () => "false" })
  isActive: boolean;

  @AutoMap()
  @Column("boolean", {
    name: "TransferPastInspection",
    nullable: true,
    default: () => "false",
  })
  transferPastInspection: boolean | null;

  @AutoMap()
  @Column("smallint", { name: "AdditionalAreas", default: () => "0" })
  additionalAreas: number;

  @AutoMap()
  @Column("boolean", { name: "HasGarage", default: () => "false" })
  hasGarage: boolean;

  @AutoMap()
  @Column("smallint", { name: "FurnishType", nullable: true })
  furnishType: number | null;

  @AutoMap()
  @Column("smallint", { name: "PropertyType", nullable: true })
  propertyType: number | null;

  @AutoMap()
  @Column("smallint", { name: "DetachmentType", nullable: true })
  detachmentType: number | null;

  @OneToMany(() => Inspections, (inspections) => inspections.property)
  inspections: Inspections[];

  @ManyToOne(() => Clients, (clients) => clients.properties)
  @JoinColumn([{ name: "ClientId", referencedColumnName: "id" }])
  client: Clients;
}
