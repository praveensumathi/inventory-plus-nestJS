import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import fs from 'fs';
import { AppService } from 'src/app.service';
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
    private appService: AppService,
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
      iat: Math.floor(Date.now() / 1000),
    } as JWTPayloadType;

    var privateKey = this.appService.getPrivateKey();

    var token = await this.jwtService.signAsync(payload, {
      privateKey: privateKey,
    });

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
