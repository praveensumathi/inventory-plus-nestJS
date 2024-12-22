import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { signInResponseDto } from './dto/auth-response.dto';
import { CustomResponse, ResponseFactory } from 'src/common/response';

export type JWTPayloadType = {
  sub: number;
  userName: string;
  roleId: string;
  roleName: string;
  iat: number;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<CustomResponse<signInResponseDto>> {
    const user = await this.usersService.findOne(username);

    //need to using crypto
    if (user?.password !== pass) {
      return ResponseFactory.error();
    }

    const payload = {
      sub: user.id,
      userName: user.userName,
      roleId: user.roleId,
      roleName: user.role,
    } as JWTPayloadType;

    var token = this.jwtService.sign(payload);

    var data: signInResponseDto = {
      access_token: token,
      user_data: {
        id: user.id,
        role: payload.roleName,
        roleId: payload.roleId,
        userName: user.userName,
      },
    };

    return ResponseFactory.success(data);
  }
}
