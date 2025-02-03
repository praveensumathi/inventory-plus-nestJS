import { Module } from "@nestjs/common";
import { InspectionService } from "./inspection.service";
import { InspectionController } from "./inspection.controller";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    // MulterModule.register({
    //   dest: "./upload",
    // }),
  ],
  controllers: [InspectionController],
  providers: [InspectionService],
})
export class InspectionModule {}
