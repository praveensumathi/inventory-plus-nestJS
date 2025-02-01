import { BaseResponse, PaginationMeta } from "src/common/dto/common.response";

class UserInfoDto {
  id: string;
  name: string;
  email: string;
  mobile: string;
}

export class UserListDtoResponse {
  id: string;
  roleId: number;
  user: UserInfoDto;
}

export class UserPaginationResponseDto {
  items: UserListDtoResponse[];
  meta: PaginationMeta;
}

export class UserPaginationResponse extends BaseResponse {
  data: UserPaginationResponseDto;
}
