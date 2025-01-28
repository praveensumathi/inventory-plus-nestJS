import { Controller, Get, Request } from "@nestjs/common";
import { InspectionService } from "./inspection.service";
import { Roles } from "src/decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("inspection")
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Get("profile")
  getAllInspection(@Request() req) {
    return req.user;
  }
}
