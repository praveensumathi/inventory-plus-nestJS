import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JWTPayloadType } from "src/common/types";
import { Request } from "express";
import { ACCESS_TOKEN } from "src/common/constants/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("SECRET_KEY"),
      //issuer : "",
    });
  }

  async validate(payload: JWTPayloadType) {
    return payload;
  }

  private static extractJWT(req: Request): string | null {
    if (req && req.cookies) {
      return req.cookies[ACCESS_TOKEN] || null;
    }
    return null;
  }
}
