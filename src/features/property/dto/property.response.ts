import { BaseResponse, PaginationMeta } from "src/common/dto/common.response";

export class PropertyListDtoResponse {
    id: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    county: string;
    postCode: string;
    country: string;
    noOfBeds: number;
    noOfBaths: number;
    noOfGarages: number;
    hasParking: boolean;
    hasGarden: boolean;
    hasGarage: boolean;
}

export class PropertyPaginationResponseDto {
    items: PropertyListDtoResponse[];
    meta: PaginationMeta;
}

export class PropertyPaginationResponse extends BaseResponse {
    data: PropertyPaginationResponseDto;
}