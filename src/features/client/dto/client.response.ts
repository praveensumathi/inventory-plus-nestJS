import { BaseResponse, PaginationMeta } from "src/common/dto/common.response";

export class ClientListDtoResponse {
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
  items: ClientListDtoResponse[];
  meta: PaginationMeta;
}

export class ClientPaginationResponse extends BaseResponse {
  data: ClientPaginationResponseDto;
}

// export class BasePaginationResponseDto<T> {
//   items: T[];
//   meta: PaginationMeta;
// }

// export class BasePaginationResponse<
//   DataDto extends Type<unknown>,
// > extends BaseResponse {
//   data: BasePaginationResponseDto<DataDto>;
// }

// export class ClientPaginationResponse extends BasePaginationResponse<ClientListDtoResponse> {}
