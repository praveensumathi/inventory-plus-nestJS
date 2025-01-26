import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AppService } from "src/app.service";
import { JwtStrategy, LocalStrategy } from "./strategy";
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customers, Properties, Users } from "src/entities";
import { UsersService } from "../users/users.service";

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("SECRET_KEY"),
        signOptions: {
          expiresIn: "1h",
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Properties, Users, Customers]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AppService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
  ],
})
export class AuthModule {}
