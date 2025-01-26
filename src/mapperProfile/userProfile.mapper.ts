import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
  MappingProfile,
} from "@automapper/core";
import { CreateUserRequestDto } from "src/features/users/dto/user.request";
import { Users } from "src/entities";

@Injectable()
export class UserMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        CreateUserRequestDto,
        Users,
      );

      createMap(
        mapper,
        Users,
        CreateUserRequestDto,
      );
    };
  }
}
