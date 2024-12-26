import { ApiProperty } from '@nestjs/swagger';

export class signInDto {
    @ApiProperty()
    userName: string;

    @ApiProperty()
    password: string;
}