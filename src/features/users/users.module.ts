import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UserMapperProfile } from "src/mapperProfile/userProfile.mapper";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customers, Users, CustomerUsers } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([Users, Customers, CustomerUsers])],
  controllers: [UsersController],
  providers: [UsersService, UserMapperProfile],
})
export class UsersModule {}
