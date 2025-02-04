import { Body, Controller, Post, Req } from "@nestjs/common";
import { PropertyService } from "./property.service";
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { PropertyRequestDto } from "./dto/property.request";
import { Request } from "express";
import { CustomResponse } from "src/common/dto/common.response";
import { ApiOkCustomResponse, ApiOkPaginatedResponse } from "src/decorator/response.decorator";
import { PaginationRequest } from "src/common/dto/pagination.request";
import { PropertyListDtoResponse, PropertyPaginationResponse } from "./dto/property.response";

@ApiBearerAuth()
@Controller("property")
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post("save")
  @ApiOkCustomResponse(PropertyRequestDto, CustomResponse)
  save(@Req() req: Request, @Body() createPropertyDto: PropertyRequestDto) {
    return this.propertyService.save(createPropertyDto, req);
  }

  @Post("get")
  @ApiOkPaginatedResponse(PropertyListDtoResponse, PropertyPaginationResponse)
  getProperties(@Req() req: Request, @Body() query: PaginationRequest) {
    return this.propertyService.getProperties(query);
  }
}
