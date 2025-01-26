import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, NotFoundException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { LoggedInUserDto } from "../dto/auth-response.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "userName" });
  }

  async validate(username: string, password: string): Promise<LoggedInUserDto> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
