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
import { ApiOkCustomResponse } from "src/decorator/response.decorator";

@ApiBearerAuth()
@Controller("property")
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post("save")
  @ApiOkCustomResponse(PropertyRequestDto, CustomResponse)
  create(@Req() req: Request, @Body() createPropertyDto: PropertyRequestDto) {
    return this.propertyService.save(createPropertyDto, req);
  }
}
