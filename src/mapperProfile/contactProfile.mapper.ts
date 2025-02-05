import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  createMap,
  Mapper,
  MappingProfile,
} from "@automapper/core";
import { Contacts } from "src/entities";
import { ContactRequestDto } from "src/features/contact/dto/contact.request";

@Injectable()
export class ContactMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, ContactRequestDto, Contacts);
    };
  }
}
