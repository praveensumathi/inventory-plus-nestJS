import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class PropertyRequestDto {
  @ApiProperty({ default: "0" })
  @AutoMap()
  id: string;

  @AutoMap()
  referenceNo?: string;

  @AutoMap()
  addressLine1: string;

  @AutoMap()
  addressLine2?: string;

  @AutoMap()
  city: string;

  @AutoMap()
  county: string;

  @AutoMap()
  postCode: string;

  @AutoMap()
  country: string;

  @AutoMap()
  latitude?: string;

  @AutoMap()
  longitude?: string;

  @AutoMap()
  noOfBeds?: number;

  @AutoMap()
  noOfBaths?: number;

  @AutoMap()
  noOfGarages?: number;

  @AutoMap()
  hasParking?: boolean;

  @AutoMap()
  hasGarden?: boolean;

  @AutoMap()
  uprn?: string;

  @AutoMap()
  parentPropertyId?: string;

  @AutoMap()
  notes?: string;

  @AutoMap()
  epcRating?: string;

  @AutoMap()
  transferPastInspection?: boolean;

  @AutoMap()
  additionalAreas?: number;

  @AutoMap()
  hasGarage?: boolean;

  @AutoMap()
  furnishType?: number;

  @AutoMap()
  propertyType?: number;

  @AutoMap()
  detachmentType?: number;

  @AutoMap()
  imageUrl?: string;

  clientId?: string;
}
