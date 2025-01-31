import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Param,
  Res,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/auth-request.dto";
import { CustomResponse } from "src/common/dto/common.response";
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { signInResponseDto, LoggedInUserDto } from "./dto/auth-response.dto";
import { Cookies, Public } from "src/decorator";
import { LocalAuthGuard } from "./guards";
import { Response, Request } from "express";
import {
  COOKIE_CUSTOMER_ID,
  COOKIE_ROLE_ID,
} from "src/common/constants/constants";

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

  @Get("set-user-customer-role/:cusId/:roleId")
  setUserCustomerRole(
    @Res() res: Response,
    @Param("cusId") customerId: string,
    @Param("roleId") roleId: number,
  ) {
    res.cookie(COOKIE_CUSTOMER_ID, customerId);
    res.cookie(COOKIE_ROLE_ID, roleId);
    return res.send("cookies set");
  }

  @Get("get-cookies")
  getCookies(
    @Res() res: Response,
    @Cookies(COOKIE_CUSTOMER_ID) customerId: string,
    @Cookies(COOKIE_ROLE_ID) roleId: number,
  ) {
    return res.send({ customerId, roleId });
  }
}
