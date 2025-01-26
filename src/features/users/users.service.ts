import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customers, Users } from "src/entities";
import { Repository } from "typeorm";
import { CreateUserRequestDto } from "./dto/user.request";
import {
  CustomResponse,
  ResponseFactory,
} from "src/common/dto/common-response";
import { isNotEmpty } from "src/common/utils/common-util";
import { PasswordUtil } from "src/common/utils";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    @InjectRepository(Customers)
    private readonly customeRepo: Repository<Customers>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async addUser(
    userRequestDto: CreateUserRequestDto,
  ): Promise<CustomResponse<Users>> {
    try {
      if (isNotEmpty(userRequestDto)) {
        var userEntity = this.mapper.map(
          userRequestDto,
          CreateUserRequestDto,
          Users,
        );

        var hashedPassword = await PasswordUtil.generateHash("demo");

        userEntity.password = hashedPassword;

        var customerEntity = await this.customeRepo.findOne({
          where: { id: userRequestDto.customerId },
        });

        if (!isNotEmpty(customerEntity)) {
          return ResponseFactory.error("Customer not found");
        }
        userEntity.customer = customerEntity;

        userEntity = await this.userRepo.save(userEntity);

        if (userEntity.id == "" || userEntity.id == "0") {
          return ResponseFactory.error();
        }

        return ResponseFactory.success(userEntity);
      }

      return ResponseFactory.error();
    } catch (error) {
      return ResponseFactory.error("Error While Create User");
    }
  }
}
