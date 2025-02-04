import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Clients, Properties } from "src/entities";
import { Like, Repository } from "typeorm";
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
import { PaginationRequest } from "src/common/dto/pagination.request";
import { PropertyPaginationResponse } from "./dto/property.response";
import { WhereCondition } from "src/common/types";
import { paginateResponse } from "src/common/utils/pagination-util";

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

    async getProperties(
        paginationRequest: PaginationRequest,
    ): Promise<PropertyPaginationResponse> {
        try {
            const { page, take, searchTerm } = paginationRequest;
            const skip = (page - 1) * take;

            let whereConditions: WhereCondition<Properties> = {};

            if (searchTerm.trim()) {
                const searchCondition = Like(`%${searchTerm}%`);
                whereConditions = [
                    { addressLine1: searchCondition },
                    { addressLine2: searchCondition },
                    { city: searchCondition },
                    { county: searchCondition },
                    { country: searchCondition },
                ];
            }

            const data = await this.propertiesRepo.findAndCount({
                where: whereConditions,
                select: {
                    id: true,
                    addressLine1: true,
                    addressLine2: true,
                    city: true,
                    county: true,
                    postCode: true,
                    country: true,
                    noOfBeds: true,
                    noOfBaths: true,
                    noOfGarages: true,
                    hasParking: true,
                    hasGarden: true,
                    hasGarage: true,
                },
                take: take,
                skip: skip,
            });

            var paginationResponse = paginateResponse(data, page, take);
            return ResponseFactory.success(paginationResponse);
        } catch (error) {
            throw ResponseFactory.error(`Error fetching properties: ${error.message}`);
        }
    }
}
