import { ApiProperty } from '@nestjs/swagger';

export class signInResponseDto {
  access_token: string;
  user_data: {
    id: number;
    userName: string;
    role: string;
    roleId: string;
  };
}
