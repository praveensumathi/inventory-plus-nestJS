import { Body, Controller, Post, Req } from "@nestjs/common";
import { InspectionService } from "./inspection.service";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import {
  InspectionCreateResponseDto,
  InspectionRequestDto,
} from "./dto/inspection.request";
import { Request } from "express";

@ApiBearerAuth()
@Controller("inspection")
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Post("save")
  @ApiOkResponse({ type: InspectionCreateResponseDto })
  save(@Req() req: Request, @Body() createInspectionDto: InspectionRequestDto) {
    return this.inspectionService.save(createInspectionDto, req);
  }
}
