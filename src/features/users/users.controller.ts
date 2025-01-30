import { Body, Controller, Post, Query, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { CreateUserRequestDto } from "./dto/user.request";
import { CustomResponse } from "src/common/dto/common-response";
import { Cookies, Public } from "src/decorator";
import { PaginationRequest } from "src/common/dto/pagination-request";
import { COOKIE_CUSTOMER_ID } from "src/common/constants/constants";

@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post("createUser")
  @ApiResponse({ type: CustomResponse })
  async addUser(
    @Body() createUserRequestDto: CreateUserRequestDto,
  ): Promise<CustomResponse> {
    const response = await this.usersService.addUser(createUserRequestDto);
    return response;
  }

  @Post("get")
  getUsers(
    @Body() query: PaginationRequest,
    @Cookies(COOKIE_CUSTOMER_ID) customerId: string,
  ) {
    return this.usersService.getUsers(query, customerId);
  }
}
