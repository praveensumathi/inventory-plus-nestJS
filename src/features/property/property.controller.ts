import { Body, Controller, Post, Req } from "@nestjs/common";
import { PropertyService } from "./property.service";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { PropertyRequestDto } from "./dto/property.request";
import { Request } from "express";
import { ApiOkPaginatedResponse } from "src/decorator/response.decorator";
import { PaginationRequest } from "src/common/dto/pagination.request";
import {
  PropertyListDtoResponse,
  PropertyPaginationResponse,
} from "./dto/property.response";

@ApiBearerAuth()
@Controller("property")
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post("save")
  @ApiOkResponse({ type: PropertyRequestDto })
  save(@Req() req: Request, @Body() createPropertyDto: PropertyRequestDto) {
    return this.propertyService.save(createPropertyDto, req);
  }

  @Post("get")
  @ApiOkPaginatedResponse(PropertyListDtoResponse, PropertyPaginationResponse)
  getProperties(@Req() req: Request, @Body() query: PaginationRequest) {
    return this.propertyService.getProperties(query);
  }
}
