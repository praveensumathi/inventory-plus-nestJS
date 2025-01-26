import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRequestDto {
  @AutoMap()
  @ApiProperty()
  roleId: number;
  @AutoMap()
  @ApiProperty()
  title: string | null;
  @AutoMap()
  @ApiProperty()
  name: string | null;
  @AutoMap()
  @ApiProperty()
  email: string | null;
  @AutoMap()
  @ApiProperty()
  telephone: string | null;
  @AutoMap()
  @ApiProperty()
  mobile: string | null;
  @AutoMap()
  @ApiProperty()
  note: string | null;
  @AutoMap()
  @ApiProperty()
  address: string | null;
  @AutoMap()
  @ApiProperty()
  emailNotification: boolean | null;
  @AutoMap()
  @ApiProperty()
  createInspection: boolean | null;

  @ApiProperty({ required: true })
  customerId: string;
}
