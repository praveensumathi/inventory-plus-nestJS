import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { Clients } from "src/entities";
import { ClientDto } from "src/features/client/dto/create-client.dto";

@Injectable()
export class ClientMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, ClientDto, Clients);
    };
  }
}
