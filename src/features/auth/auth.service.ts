import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import {
  SignInDataDto,
  LoggedInUserDto,
  UserProfileResponseDto,
  SignInResponseDto,
  SignInUserDataDto,
} from "./dto/auth.response";
import {
  CustomResponse,
  ResponseFactory,
} from "src/common/dto/common.response";
import { isNotEmpty, PasswordUtil } from "src/common/utils";
import { JWTPayloadType } from "src/common/types";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loggedInUser: LoggedInUserDto): Promise<SignInResponseDto> {
    const payload = {
      sub: loggedInUser.id,
      userName: loggedInUser.name,
      email: loggedInUser.email,
    } as JWTPayloadType;

    var token = this.jwtService.sign(payload);

    var data: SignInDataDto = {
      accessToken: token,
    };

    return ResponseFactory.success(data);
  }

  async validateUser(email: string, pass: string): Promise<LoggedInUserDto> {
    const userEntity = await this.usersService.findUserByEmail(
      email.toLowerCase().trim(),
    );

    if (isNotEmpty(userEntity)) {
      var passwordIsMatched = await PasswordUtil.validatePassword(
        pass,
        userEntity.password,
      );
      if (passwordIsMatched) {
        return {
          id: userEntity.id,
          name: userEntity.name,
          email: userEntity.email,
        } as LoggedInUserDto;
      }
    }
    return null;
  }

  async getProfile(
    loggedInUser: JWTPayloadType,
  ): Promise<UserProfileResponseDto> {
    var userCustomersWithRole = await this.usersService.getUserCustomerList(
      loggedInUser.sub,
    );

    var data: SignInUserDataDto = {
      id: loggedInUser.sub,
      name: loggedInUser.userName,
      email: loggedInUser.email,
      userCustomers: userCustomersWithRole,
    };

    return ResponseFactory.success(data);
  }
}
