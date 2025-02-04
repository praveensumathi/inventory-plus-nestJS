import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Clients, Properties } from "src/entities";
import { Repository } from "typeorm";
import { PropertyRequestDto } from "./dto/property.request";
import {
  CustomResponse,
  ResponseFactory,
} from "src/common/dto/common.response";
import { NEW_ENTITY_ID } from "src/common/constants/constants";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { getLoggedInUserId } from "src/common/utils";
import { Request } from "express";

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Properties)
    private readonly propertiesRepo: Repository<Properties>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async save(
    propertyDto: PropertyRequestDto,
    req: Request,
  ): Promise<CustomResponse<PropertyRequestDto>> {
    try {
      let propertyEntity = await this.propertiesRepo.findOneBy({
        id: propertyDto.id,
      });

      if (propertyEntity == null && propertyDto.id == NEW_ENTITY_ID) {
        return ResponseFactory.error("Property Not Found");
      }

      var loggedInUserId = getLoggedInUserId(req);

      if (propertyDto.id == NEW_ENTITY_ID) {
        propertyEntity = this.mapper.map(
          propertyDto,
          PropertyRequestDto,
          Properties,
        );
        propertyEntity.createdBy = loggedInUserId;

        var clientEntity = new Clients();
        clientEntity.id = propertyDto.clientId;

        propertyEntity.client = clientEntity;
      } else {
        this.mapper.mutate(
          propertyDto,
          propertyEntity,
          PropertyRequestDto,
          Properties,
        );
        propertyEntity.modifiedBy = loggedInUserId;
      }

      propertyEntity = await this.propertiesRepo.save(propertyEntity);

      propertyDto.id = propertyEntity.id;
      return ResponseFactory.success(propertyDto);
    } catch (error) {
      console.error("Error saving property:", error);
      return ResponseFactory.error(error.message);
    }
  }
}
