import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  createMap,
  Mapper,
  MappingProfile,
} from "@automapper/core";
import { CreateClientDto } from "src/features/client/dto/create-client.dto";
import { Clients } from "src/entities";

@Injectable()
export class ClientMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        CreateClientDto,
        Clients,
      );
    };
  }
}
