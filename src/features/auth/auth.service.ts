import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { signInResponseDto, LoggedInUserDto } from "./dto/auth-response.dto";
import {
  CustomResponse,
  ResponseFactory,
} from "src/common/dto/common.response";
import { isNotEmpty, PasswordUtil } from "src/common/utils";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities";
import { Repository } from "typeorm";

export type JWTPayloadType = {
  sub: string;
  userName: string;
  iat?: number;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  async login(
    loggedInUser: LoggedInUserDto,
  ): Promise<CustomResponse<signInResponseDto>> {
    var userCustomersWithRole = await this.usersService.getUserCustomerList(
      loggedInUser.id,
    );

    const payload = {
      sub: loggedInUser.id,
      userName: loggedInUser.name,
      email: loggedInUser.email,
    } as JWTPayloadType;

    var token = this.jwtService.sign(payload);

    var data: signInResponseDto = {
      accessToken: token,
      userData: {
        ...loggedInUser,
        userCustomers: userCustomersWithRole,
      },
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
}
