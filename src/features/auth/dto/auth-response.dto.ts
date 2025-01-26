import { ApiProperty } from "@nestjs/swagger";

export class LoggedInUserDto {
  id: string;
  name: string;
  role: number;
  customerId: string;
}

export class signInResponseDto {
  accessToken: string;
  userData: LoggedInUserDto;
}
