import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { signInResponseDto, LoggedInUserDto } from "./dto/auth-response.dto";
import {
  CustomResponse,
  ResponseFactory,
} from "src/common/dto/common-response";
import { isNotEmpty, PasswordUtil } from "src/common/utils";

export type JWTPayloadType = {
  sub: string;
  userName: string;
  role: number;
  iat?: number;
  customerId: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    user: LoggedInUserDto,
  ): Promise<CustomResponse<signInResponseDto>> {
    const payload = {
      sub: user.id,
      userName: user.name,
      role: user.role,
      customerId: user.customerId,
    } as JWTPayloadType;

    var token = this.jwtService.sign(payload);

    var data: signInResponseDto = {
      accessToken: token,
      userData: user,
    };

    return ResponseFactory.success(data);
  }

  async validateUser(email: string, pass: string): Promise<LoggedInUserDto> {
    const userEntity = await this.usersService.findUserByEmail(email);

    if (isNotEmpty(userEntity)) {
      var passwordIsMatched = await PasswordUtil.validatePassword(
        pass,
        userEntity.password,
      );
      if (passwordIsMatched) {
        return {
          id: userEntity.id,
          name: userEntity.name,
          role: userEntity.roleId,
          customerId: userEntity.customer.id,
        } as LoggedInUserDto;
      }
    }
    return null;
  }
}
