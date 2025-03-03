import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Inspections, Properties } from "src/entities";
import { Repository } from "typeorm";
import {
  InspectionCreateResponseDto,
  InspectionRequestDto,
} from "./dto/inspection.request";
import {
  CustomResponse,
  ResponseFactory,
} from "src/common/dto/common.response";
import { NEW_ENTITY_ID } from "src/common/constants/constants";
import { getLoggedInUserId } from "src/common/utils";
import { Request } from "express";

@Injectable()
export class InspectionService {
  constructor(
    @InjectRepository(Inspections)
    private readonly inspectionsRepo: Repository<Inspections>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async save(
    inspectionDto: InspectionRequestDto,
    req: Request,
  ): Promise<InspectionCreateResponseDto> {
    try {
      let inspectionEntity = await this.inspectionsRepo.findOneBy({
        id: inspectionDto.id,
      });

      if (inspectionEntity == null && inspectionDto.id != NEW_ENTITY_ID) {
        return ResponseFactory.error("Inspection Not Found");
      }

      var loggedInUserId = getLoggedInUserId(req);

      if (inspectionDto.id == NEW_ENTITY_ID) {
        inspectionEntity = this.mapper.map(
          inspectionDto,
          InspectionRequestDto,
          Inspections,
        );
        inspectionEntity.createdBy = loggedInUserId;

        var propertyEntity = new Properties();
        propertyEntity.id = inspectionDto.propertyId;

        inspectionEntity.property = propertyEntity;
      } else {
        this.mapper.mutate(
          inspectionDto,
          inspectionEntity,
          InspectionRequestDto,
          Inspections,
        );
        inspectionEntity.modifiedBy = loggedInUserId;
      }

      inspectionEntity = await this.inspectionsRepo.save(inspectionEntity);

      inspectionDto.id = inspectionEntity.id;
      return ResponseFactory.success(inspectionDto);
    } catch (error) {
      console.error("Error saving inspections:", error);
      return ResponseFactory.error(error.message);
    }
  }
}
