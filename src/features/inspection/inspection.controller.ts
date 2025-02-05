import {
  Body,
  Controller,
  Post,
  Req,
} from "@nestjs/common";
import { InspectionService } from "./inspection.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CustomResponse } from "src/common/dto/common.response";
import { InspectionRequestDto } from "./dto/inspection-request";
import { ApiOkCustomResponse } from "src/decorator/response.decorator";
import { Request } from "express";

@ApiBearerAuth()
@Controller("inspection")
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Post("save")
  @ApiOkCustomResponse(InspectionRequestDto, CustomResponse)
  save(@Req() req: Request, @Body() createInspectionDto: InspectionRequestDto) {
    return this.inspectionService.save(createInspectionDto, req);
  }
}
