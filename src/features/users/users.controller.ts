import { Body, Controller, Post, Query, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
} from "@nestjs/swagger";
import { CreateUserRequestDto, GetUserRequestDto } from "./dto/user.request";
import { Cookies, Public } from "src/decorator";
import { COOKIE_CUSTOMER_ID } from "src/common/constants/constants";
import { UserListDtoResponse } from "./dto/user.response";
import {
  CustomResponse,
  PaginationResponseDto,
} from "src/common/dto/common.response";

@ApiBearerAuth()
@Controller("users")
@ApiExtraModels(CustomResponse, PaginationResponseDto, UserListDtoResponse)
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
    @Body() query: GetUserRequestDto,
    @Cookies(COOKIE_CUSTOMER_ID) customerId: string,
  ) {
    return this.usersService.getUsers(query, customerId);
  }
}
