import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from "@automapper/core";
import { Clients } from "src/entities";
import { ClientDataDto } from "src/features/client/dto/client.request";

@Injectable()
export class ClientMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, ClientDataDto, Clients);
    };
  }
}
