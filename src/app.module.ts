import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./guard/roles.guard";
import {
  AuthModule,
  CustomerModule,
  InspectionModule,
  PropertyModule,
  UsersModule,
} from "./features";
import { JwtAuthGuard } from "./features/auth/guards";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mssql",
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      port: parseInt(process.env.POSTGRES_PORT),
      logging: process.env.MODE == "DEV",
      entities: ["dist/entities/*.js"],
      options: {
        trustServerCertificate: true,
      },
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    InspectionModule,
    PropertyModule,
    CustomerModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
