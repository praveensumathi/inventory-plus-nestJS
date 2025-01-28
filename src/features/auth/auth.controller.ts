import { Body, Controller, Post, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/auth-request.dto";
import { CustomResponse } from "src/common/dto/common-response";
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { signInResponseDto, LoggedInUserDto } from "./dto/auth-response.dto";
import { Public } from "src/decorator";
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
  login(@Req() req, @Body() signInDto: SignInDto) {
    var loggedInUser: LoggedInUserDto = req.user;
    return this.authService.login(loggedInUser);
  }
}
