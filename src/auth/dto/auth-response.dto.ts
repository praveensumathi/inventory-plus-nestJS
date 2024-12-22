import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  roleId: string;
}

export class signInResponseDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  user_data: UserDto;
}
