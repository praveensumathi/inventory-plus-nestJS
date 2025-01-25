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

@Index("PK_Properties", ["id"], { unique: true })
@Entity("Properties", { schema: "dbo" })
export class Properties {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @AutoMap()
  @Column("varchar", { name: "Ref", nullable: true, length: 50 })
  ref: string | null;

  @AutoMap()
  @Column("varchar", { name: "AddressLine1", nullable: true, length: 500 })
  addressLine1: string | null;

  @AutoMap()
  @Column("varchar", { name: "AddressLine2", nullable: true, length: 500 })
  addressLine2: string | null;

  @AutoMap()
  @Column("varchar", { name: "City", nullable: true, length: 100 })
  city: string | null;

  @AutoMap()
  @Column("varchar", { name: "County", nullable: true, length: 100 })
  county: string | null;

  @AutoMap()
  @Column("varchar", { name: "PostCode", nullable: true, length: 50 })
  postCode: string | null;

  @AutoMap()
  @Column("varchar", { name: "Country", nullable: true, length: 200 })
  country: string | null;

  @AutoMap()
  @Column("varchar", { name: "Latitude", nullable: true, length: 50 })
  latitude: string | null;

  @AutoMap()
  @Column("varchar", { name: "Longitude", nullable: true, length: 50 })
  longitude: string | null;

  @AutoMap()
  @Column("varchar", { name: "FurnishedType", nullable: true, length: 100 })
  furnishedType: string | null;

  @AutoMap()
  @Column("varchar", { name: "PropertyType", nullable: true, length: 200 })
  propertyType: string | null;

  @AutoMap()
  @Column("varchar", { name: "DetachmentType", nullable: true, length: 50 })
  detachmentType: string | null;

  @AutoMap()
  @Column("tinyint", { name: "NoOfBeds", nullable: true })
  noOfBeds: number | null;

  @AutoMap()
  @Column("tinyint", { name: "NoOfBaths", nullable: true })
  noOfBaths: number | null;

  @AutoMap()
  @Column("tinyint", { name: "NoOfGarages", nullable: true })
  noOfGarages: number | null;

  @AutoMap()
  @Column("bit", { name: "HasParking", nullable: true })
  hasParking: boolean | null;

  @AutoMap()
  @Column("bit", { name: "HasGarden", nullable: true })
  hasGarden: boolean | null;

  @AutoMap()
  @Column("varchar", { name: "UPRN", nullable: true, length: 100 })
  uprn: string | null;

  @AutoMap()
  @Column("bigint", { name: "ParentPropertyId", nullable: true })
  parentPropertyId: string | null;

  @AutoMap()
  @Column("varchar", { name: "notes", nullable: true, length: 500 })
  notes: string | null;

  @AutoMap()
  @Column("nvarchar", { name: "tags", nullable: true })
  tags: string | null;

  @AutoMap()
  @Column("varchar", { name: "EPCRating", nullable: true, length: 50 })
  epcRating: string | null;

  @AutoMap()
  @Column("bigint", { name: "CreatedBy", nullable: true })
  createdBy: string | null;

  @AutoMap()
  @Column("datetime", {
    name: "CreatedDate",
    nullable: true,
    default: () => "getdate()",
  })
  createdDate: Date | null;

  @AutoMap()
  @Column("bigint", { name: "ModifiedBy", nullable: true })
  modifiedBy: string | null;

  @AutoMap()
  @Column("datetime", {
    name: "ModifiedDate",
    nullable: true,
    default: () => "getdate()",
  })
  modifiedDate: Date | null;

  @AutoMap()
  @Column("bit", { name: "IsActive", default: () => "(0)" })
  isActive: boolean;

  @OneToMany(() => Inspections, (inspections) => inspections.property)
  inspections: Inspections[];

  @ManyToOne(() => Clients, (clients) => clients.properties)
  @JoinColumn([{ name: "ClientId", referencedColumnName: "id" }])
  client: Clients;
}
