import { Controller } from '@nestjs/common';
import { StaticService } from './static.service';
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller('static')
export class StaticController {
  constructor(private readonly staticService: StaticService) {}
}
