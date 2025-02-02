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
import { PropertyRequestDto } from "src/features/property/dto/property.request";
import { Properties } from "src/entities";

@Injectable()
export class PropertyMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, PropertyRequestDto, Properties);
    };
  }
}
