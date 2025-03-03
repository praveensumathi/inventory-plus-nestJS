import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse, CustomResponse } from "src/common/dto/common.response";

export class LoggedInUserDto {
  id: string;
  name: string;
  email: string;
}

export class UserCustomers {
  customerId: string;
  customerName: string;
  roleId: number;
  roleName: string;
}

export class SignInUserDataDto {
  id: string;
  name: string;
  email: string;
  userCustomers?: UserCustomers[];
}

export class SignInDataDto {
  accessToken: string;
}

export class UserProfileResponseDto extends BaseResponse {
  data: SignInUserDataDto;
}

export class CustomerRoleSelectionDataDto {
  customerId: string;
  roleId: string;
}

export class SelectCustomerRoleResponseDto extends BaseResponse {
  data: CustomerRoleSelectionDataDto;
}

export class SignInResponseDto extends BaseResponse {
  data: SignInDataDto;
}
