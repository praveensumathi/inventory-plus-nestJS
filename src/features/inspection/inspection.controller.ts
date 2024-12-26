import { Controller, Get, Request } from '@nestjs/common';
import { InspectionService } from './inspection.service';
import { Roles } from 'src/decorator';

@Controller('inspection')
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Get('profile')
  @Roles(['admin'])
  getAllInspection(@Request() req) {
    return req.user;
  }
}
