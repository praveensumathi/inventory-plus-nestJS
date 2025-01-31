import { ApiProperty } from "@nestjs/swagger";

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
