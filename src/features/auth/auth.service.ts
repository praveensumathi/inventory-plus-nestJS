import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { signInResponseDto, UserDto } from './dto/auth-response.dto';
import {
  CustomResponse,
  ResponseFactory,
} from 'src/common/dto/common-response';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from 'src/entities';
import { Repository } from 'typeorm';

export type JWTPayloadType = {
  sub: number;
  userName: string;
  roles: string[];
  iat: number;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Test)
    private readonly testRepo: Repository<Test>,
  ) {}

  async login(user: UserDto): Promise<CustomResponse<signInResponseDto>> {
    const payload = {
      sub: user.id,
      userName: user.userName,
      roles: user.roles,
    } as JWTPayloadType;

    var token = this.jwtService.sign(payload);

    var data: signInResponseDto = {
      accessToken: token,
      userData: {
        id: user.id,
        roles: payload.roles,
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

  async getTestData(): Promise<any> {
    return this.testRepo.find();
  }
}
