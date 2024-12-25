import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { signInResponseDto, UserDto } from './dto/auth-response.dto';
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

  async login(user: UserDto): Promise<CustomResponse<signInResponseDto>> {
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

  async validateUser(username: string, pass: string): Promise<UserDto> {
    const user = await this.usersService.findOne(username);

    //TODO
    //use bcrypt to check passwords
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result as UserDto;
    }
    return null;
  }
}
