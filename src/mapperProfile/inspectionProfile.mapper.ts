import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  createMap,
  Mapper,
  MappingProfile,
} from "@automapper/core";
import { Inspections } from "src/entities";
import { InspectionRequestDto } from "src/features/inspection/dto/inspection-request";

@Injectable()
export class InspectionMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, InspectionRequestDto, Inspections);
    };
  }
}
