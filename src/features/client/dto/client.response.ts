import { BaseResponse, PaginationMeta } from "src/common/dto/common.response";

export class ClientListDataDto {
  id: string;
  name: string;
  email: string;
  company: string;
  telephone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  county: string;
  postCode: string;
  country: string;
}

export class ClientPaginationResponseDto {
  items: ClientListDataDto[];
  meta: PaginationMeta;
}

export class ClientPaginationResponse extends BaseResponse {
  data: ClientPaginationResponseDto;
}
