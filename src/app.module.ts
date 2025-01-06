import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./guard/roles.guard";
import { AuthModule, InspectionModule, UsersModule } from "./features";
import { JwtAuthGuard } from "./features/auth/guards";
import { PropertyModule } from "./features/property/property.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mssql",
      host: process.env.SQLSERVER_HOST,
      username: process.env.SQLSERVER_USERNAME,
      password: process.env.SQLSERVER_PASSWORD,
      port: parseInt(process.env.SQLSERVER_PORT),
      database: process.env.SQLSERVER_DATABASE,
      options: {
        trustServerCertificate: true,
      },
      logging: process.env.MODE == "DEV",
      entities: ["dist/entities/*.js"],
      //synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    InspectionModule,
    PropertyModule,
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
