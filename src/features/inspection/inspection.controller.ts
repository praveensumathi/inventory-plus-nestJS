import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { InspectionService } from "./inspection.service";
import { Public, Roles } from "src/decorator";
import { ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserRequestDto } from "../users/dto/user.request";

@ApiBearerAuth()
@Controller("inspection")
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Public()
  @Post("upload")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(
    @Body() body: CreateUserRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
