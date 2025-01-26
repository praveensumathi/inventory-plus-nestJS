import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getSecretKey(): string {
    return "My SecretKey";
  }
}
