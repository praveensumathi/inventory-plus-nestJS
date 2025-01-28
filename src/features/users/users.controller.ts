import { Body, Controller, Post, Get, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";
import { CreateUserRequestDto } from "./dto/user.request";
import { CustomResponse } from "src/common/dto/common-response";
import { Public } from "src/decorator";
import { Request } from "express";

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
}
