import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Inspections } from "./Inspections";
import { Clients } from "./Clients";

@Index("PK_Properties", ["id"], { unique: true })
@Entity("Properties", { schema: "dbo" })
export class Properties {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("varchar", { name: "Ref", nullable: true, length: 50 })
  ref: string | null;

  @Column("varchar", { name: "AddressLine1", nullable: true, length: 500 })
  addressLine1: string | null;

  @Column("varchar", { name: "AddressLine2", nullable: true, length: 500 })
  addressLine2: string | null;

  @Column("varchar", { name: "City", nullable: true, length: 100 })
  city: string | null;

  @Column("varchar", { name: "County", nullable: true, length: 100 })
  county: string | null;

  @Column("varchar", { name: "PostCode", nullable: true, length: 50 })
  postCode: string | null;

  @Column("varchar", { name: "Country", nullable: true, length: 200 })
  country: string | null;

  @Column("varchar", { name: "Latitude", nullable: true, length: 50 })
  latitude: string | null;

  @Column("varchar", { name: "Longitude", nullable: true, length: 50 })
  longitude: string | null;

  @Column("varchar", { name: "FurnishedType", nullable: true, length: 100 })
  furnishedType: string | null;

  @Column("varchar", { name: "PropertyType", nullable: true, length: 200 })
  propertyType: string | null;

  @Column("varchar", { name: "DetachmentType", nullable: true, length: 50 })
  detachmentType: string | null;

  @Column("tinyint", { name: "NoOfBeds", nullable: true })
  noOfBeds: number | null;

  @Column("tinyint", { name: "NoOfBaths", nullable: true })
  noOfBaths: number | null;

  @Column("tinyint", { name: "NoOfGarages", nullable: true })
  noOfGarages: number | null;

  @Column("bit", { name: "HasParking", nullable: true })
  hasParking: boolean | null;

  @Column("bit", { name: "HasGarden", nullable: true })
  hasGarden: boolean | null;

  @Column("varchar", { name: "UPRN", nullable: true, length: 100 })
  uprn: string | null;

  @Column("bigint", { name: "ParentPropertyId", nullable: true })
  parentPropertyId: string | null;

  @Column("varchar", { name: "notes", nullable: true, length: 500 })
  notes: string | null;

  @Column("nvarchar", { name: "tags", nullable: true })
  tags: string | null;

  @Column("varchar", { name: "EPCRating", nullable: true, length: 50 })
  epcRating: string | null;

  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @Column("datetime", {
    name: "CreatedDate",
    nullable: true,
    default: () => "getdate()",
  })
  createdDate: Date | null;

  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

  @Column("datetime", {
    name: "ModifiedDate",
    nullable: true,
    default: () => "getdate()",
  })
  modifiedDate: Date | null;

  @Column("bit", { name: "IsActive", default: () => "(0)" })
  isActive: boolean;

  @OneToMany(() => Inspections, (inspections) => inspections.property)
  inspections: Inspections[];

  @ManyToOne(() => Clients, (clients) => clients.properties)
  @JoinColumn([{ name: "ClientId", referencedColumnName: "id" }])
  client: Clients;
}
