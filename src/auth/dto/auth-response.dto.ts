import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  roles: string[];
}

export class signInResponseDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  userData: UserDto;
}
