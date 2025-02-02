import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Properties } from "src/entities";
import { Repository } from "typeorm";
import { PropertyRequestDto } from "./dto/property.request";
import {
  CustomResponse,
  ResponseFactory,
} from "src/common/dto/common.response";
import { CREATE_ID } from "src/common/constants/constants";
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
  ): Promise<CustomResponse> {
    try {
      let propertyEntity = await this.propertiesRepo.findOne({
        where: { id: propertyDto.id },
      });

      propertyEntity ??= new Properties();
      var loggedInUserId = getLoggedInUserId(req);

      if (propertyEntity.id == CREATE_ID) {
        propertyEntity = this.mapper.map(
          propertyDto,
          PropertyRequestDto,
          Properties,
        );
        propertyEntity.createdBy = loggedInUserId;
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

      return ResponseFactory.success(propertyEntity);
    } catch (error) {
      console.error("Error saving property:", error);
      return ResponseFactory.error(error.message);
    }
  }
}
