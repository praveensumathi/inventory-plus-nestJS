import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Inspections } from "src/entities";

export class PropertyDto {
    id?: string;
    referenceNo?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    county?: string;
    postCode?: string;
    country?: string;
    latitude?: string;
    longitude?: string;
    noOfBeds?: number;
    noOfBaths?: number;
    noOfGarages?: number;
    hasParking?: boolean;
    hasGarden?: boolean;
    uprn?: string;
    parentPropertyId?: string;
    notes?: string;
    epcRating?: string;
    createdBy?: string;
    createdDate?: Date;
    modifiedBy?: string;
    modifiedDate?: Date;
    isActive?: boolean;
    transferPastInspection?: boolean;
    additionalAreas?: number;
    hasGarage?: boolean;
    furnishType?: number;
    propertyType?: number;
    detachmentType?: number;
    imageUrl?: string;
    inspections?: string;
    client?: string;
}