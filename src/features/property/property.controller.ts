import { Body, Controller, Post, Req } from '@nestjs/common';
import { PropertyService } from './property.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PropertyDto } from './dto/property.dto';
import { Request } from "express";

@ApiBearerAuth()
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }
  
  @Post("save")
  create(
    @Req() req: Request,
    @Body() createPropertyDto: PropertyDto,
  ) {
    return this.propertyService.save(createPropertyDto, req);
  }
  
}
