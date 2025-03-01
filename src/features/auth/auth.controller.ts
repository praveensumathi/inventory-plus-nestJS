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
import { ApiBearerAuth, ApiExtraModels } from "@nestjs/swagger";
import {
  signInResponseDto,
  LoggedInUserDto,
  UserProfileResponseDto,
} from "./dto/auth-response.dto";
import { Cookies, Public } from "src/decorator";
import { LocalAuthGuard } from "./guards";
import { Response, Request } from "express";
import {
  ACCESS_TOKEN,
  COOKIE_CUSTOMER_ID,
  COOKIE_ROLE_ID,
} from "src/common/constants/constants";
import { JWTPayloadType } from "src/common/types";
import { ApiOkCustomResponse } from "src/decorator/response.decorator";

@ApiBearerAuth()
@Controller("auth")
@ApiExtraModels(CustomResponse, signInResponseDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOkCustomResponse(signInResponseDto, CustomResponse)
  @UseGuards(LocalAuthGuard)
  @Public()
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() signInDto: SignInDto,
  ) {
    var loggedInUser = req.user as LoggedInUserDto;
    const loginRespone = await this.authService.login(loggedInUser);

    if (!loginRespone.data.accessToken) {
      res.status(401).json({ message: "Unauthorized" });
    }

    res.cookie(ACCESS_TOKEN, loginRespone.data.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    res.status(200).json(loginRespone);
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

  @Get("me")
  @ApiOkCustomResponse(UserProfileResponseDto, CustomResponse)
  getMe(@Req() req: Request) {
    //var isAuthenticated = req.isAuthenticated();
    var loggedInUser = req.user as JWTPayloadType;
    return this.authService.getProfile(loggedInUser);
  }
}
