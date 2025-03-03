import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Param,
  Res,
  Get,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/auth.request";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import {
  LoggedInUserDto,
  UserProfileResponseDto,
  SelectCustomerRoleResponseDto,
  SignInResponseDto,
  CustomerRoleSelectionDataDto,
} from "./dto/auth.response";
import { Cookies, Public } from "src/decorator";
import { LocalAuthGuard } from "./guards";
import { Response, Request } from "express";
import {
  ACCESS_TOKEN,
  COOKIE_CUSTOMER_ID,
  COOKIE_ROLE_ID,
} from "src/common/constants/constants";
import { JWTPayloadType } from "src/common/types";

@ApiBearerAuth()
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOkResponse({ type: SignInResponseDto })
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
  @ApiOkResponse({
    description: "CustomerId and RoleId set successfully",
    type: SelectCustomerRoleResponseDto,
  })
  SetUserCustomerRole(
    @Res() res: Response,
    @Req() req: Request,
    @Param("cusId") customerId: string,
    @Param("roleId") roleId: string,
  ) {
    if (!customerId || !roleId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "CustomerId , RoleId Required",
        data: null,
      });
    }
    res.cookie(COOKIE_CUSTOMER_ID, customerId);
    res.cookie(COOKIE_ROLE_ID, roleId);

    if (
      req.cookies[COOKIE_CUSTOMER_ID] != customerId ||
      req.cookies[COOKIE_ROLE_ID] != roleId
    ) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "CustomerId , RoleId not set",
        data: null,
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "CustomerId , RoleId set successfully",
      data: {
        customerId,
        roleId,
      } as CustomerRoleSelectionDataDto,
    });
  }

  @Get("get-cookies")
  getCookies(
    @Res() res: Response,
    @Cookies(COOKIE_CUSTOMER_ID) customerId: string,
    @Cookies(COOKIE_ROLE_ID) roleId: number,
  ) {
    return res.send({ customerId, roleId });
  }

  @Get("getProfile")
  @ApiOkResponse({ type: UserProfileResponseDto })
  GetProfile(@Req() req: Request) {
    //var isAuthenticated = req.isAuthenticated();
    var loggedInUser = req.user as JWTPayloadType;
    return this.authService.getProfile(loggedInUser);
  }
}
