import { Module } from "@nestjs/common";
import { InspectionService } from "./inspection.service";
import { InspectionController } from "./inspection.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Inspections } from "src/entities";
import { InspectionMapperProfile } from "src/mapperProfile/inspectionProfile.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([Inspections])],
  controllers: [InspectionController],
  providers: [InspectionService, InspectionMapperProfile],
})
export class InspectionModule {}
