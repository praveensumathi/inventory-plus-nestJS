import { Controller, Get } from "@nestjs/common";
import { StaticService } from "./static.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Public } from "src/decorator";

// @ApiBearerAuth()
@Controller("static")
export class StaticController {
  constructor(private readonly staticService: StaticService) {}

  @Public()
  @Get("getStaticData")
  getStaticData() {
    return this.staticService.getStaticData();
  }
}
