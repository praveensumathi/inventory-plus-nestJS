import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signInDto } from "./dto/auth-request.dto";
import { CustomResponse } from "src/common/dto/common-response";
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { signInResponseDto, LoggedInUserDto } from "./dto/auth-response.dto";
import { Public, Roles } from "src/decorator";
import { LocalAuthGuard } from "./guards";

@ApiBearerAuth()
@Controller("auth")
@ApiExtraModels(CustomResponse, signInResponseDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiResponse({
    status: 200,
    description: "Login successful",
    schema: {
      allOf: [
        { $ref: getSchemaPath(CustomResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(signInResponseDto) },
          },
        },
      ],
    },
  })
  @UseGuards(LocalAuthGuard)
  @Public()
  async login(@Request() req, @Body() signInDto: signInDto) {
    var loggedInUser: LoggedInUserDto = req.user;
    return this.authService.login(loggedInUser);
  }

  @Get("profile")
  @Roles(["admin", "manager"])
  getProfile(@Request() req) {
    return req.user;
  }

  @Get("manager")
  @Roles(["manager"])
  getManagerRole() {
    return "manager role";
  }

  @Get("public-api")
  @Public()
  getPublicData() {
    return "public data no auth needed";
  }
}
