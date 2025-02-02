import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CreateUserRequestDto, GetUserRequestDto } from "./dto/user.request";
import { Cookies, Public } from "src/decorator";
import { COOKIE_CUSTOMER_ID } from "src/common/constants/constants";
import {
  UserListDtoResponse,
  UserPaginationResponse,
} from "./dto/user.response";
import { CustomResponse } from "src/common/dto/common.response";
import { ApiOkPaginatedResponse } from "src/decorator/pagination.decorator";

@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post("createUser")
  async addUser(
    @Body() createUserRequestDto: CreateUserRequestDto,
  ): Promise<CustomResponse> {
    const response = await this.usersService.addUser(createUserRequestDto);
    return response;
  }

  @Post("get")
  @ApiOkPaginatedResponse(UserListDtoResponse, UserPaginationResponse)
  getUsers(
    @Body() query: GetUserRequestDto,
    @Cookies(COOKIE_CUSTOMER_ID) customerId: string,
  ) {
    return this.usersService.getUsers(query, customerId);
  }
}
