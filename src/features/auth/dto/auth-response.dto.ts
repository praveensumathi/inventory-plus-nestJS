import { ApiProperty } from "@nestjs/swagger";

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

  constructor(data: {
    customerId: string;
    customerName: string;
    roleId: number;
    roleName: string;
  }) {
    this.customerId = data.customerId;
    this.customerName = data.customerName;
    this.roleId = data.roleId;
    this.roleName = data.roleName;
  }
}

export class SignInUserDataDto {
  id: string;
  name: string;
  email: string;
  userCustomers?: UserCustomers[];
}

export class signInResponseDto {
  accessToken: string;
  userData: SignInUserDataDto;
}
