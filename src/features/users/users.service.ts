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
import { CustomerUsers } from "src/entities/CustomerUsers";
import { PasswordUtil } from "src/common/utils";
import { UserCustomers } from "../auth/dto/auth-response.dto";
import { RolesEnum } from "src/common/enums/enum";
import { PaginationRequest } from "src/common/dto/pagination-request";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    @InjectRepository(Customers)
    private readonly customerRepo: Repository<Customers>,
    @InjectRepository(CustomerUsers)
    private readonly customerUsersRepo: Repository<CustomerUsers>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) { }

  async addUser(userRequestDto: CreateUserRequestDto): Promise<CustomResponse> {
    try {
      if (isNotEmpty(userRequestDto)) {
        var userEntity = this.mapper.map(
          userRequestDto,
          CreateUserRequestDto,
          Users,
        );

        var existUser = await this.userRepo.findOne({
          where: { email: userEntity.email.toString().toLowerCase() },
          select: {
            id: true,
          },
        });

        if (isNotEmpty(existUser)) {
          var customerUser = await this.customerUsersRepo.findOne({
            where: {
              customer: { id: userRequestDto.customerId },
              user: { id: existUser.id },
            },
          });
          if (isNotEmpty(customerUser)) {
            return ResponseFactory.error(
              "User Already Exists Under the Customer",
            );
          }

          await this.customerUsersRepo.save({
            customer: { id: userRequestDto.customerId },
            user: { id: existUser.id },
            roleId: userRequestDto.roleId,
          });

          return ResponseFactory.success();
        }

        var resetToken = await PasswordUtil.generateResetToken();
        userEntity.token = resetToken;

        userEntity = await this.userRepo.save(userEntity);

        await this.customerUsersRepo.save({
          customer: { id: userRequestDto.customerId },
          user: { id: userEntity.id },
        });

        return ResponseFactory.success();
      }

      return ResponseFactory.error("Error While Create User");
    } catch (error) {
      return ResponseFactory.error("Error While Create User");
    }
  }

  async findUserByEmail(email: string) {
    email = email.trim().toLowerCase();
    var userEntity = await this.userRepo.findOne({
      where: {
        email: email,
      },
    });

    return userEntity;
  }

  async getUserCustomerList(userId: string): Promise<UserCustomers[]> {
    var userWithListOfCustomerAndRole = await this.customerUsersRepo.find({
      where: {
        user: { id: userId },
      },
      relations: {
        customer: true,
      },
      select: {
        roleId: true,
        customer: {
          id: true,
          name: true,
        },
      },
    });

    var userCustomersWithRole = userWithListOfCustomerAndRole.map((item) => {
      return new UserCustomers({
        customerId: item.customer.id,
        customerName: item.customer.name,
        roleId: item.roleId,
        roleName: RolesEnum[item.roleId],
      });
    });

    return userCustomersWithRole;
  }

  async getUsers(paginationRequest: PaginationRequest, customerId: string): Promise<Pagination<Users>> {
    try {

      const customerUserQueryBuilder = this.customerUsersRepo.createQueryBuilder("customerUser")
        .select("customerUser.userId")
        .where("customerUser.customerId = :customerId", { customerId });

      const matchedUserIdResponse = await customerUserQueryBuilder.getRawMany();
      const userIds = matchedUserIdResponse.map((item: any) => item.userId);


      // Step 3: Query users based on userIds
      const userQueryBuilder = this.userRepo.createQueryBuilder("users")
        .select(["users.id", "users.email", "users.name"])
        .where("users.id IN (:...userIds)", { userIds });

      // Step 4: Apply search filter if provided
      if (paginationRequest.searchTerm) {
        userQueryBuilder.andWhere(
          "(users.email ILIKE :searchTerm OR users.firstName ILIKE :searchTerm OR users.lastName ILIKE :searchTerm)",
          { searchTerm: `%${paginationRequest.searchTerm}%` }
        );
      }

      // Step 5: Apply pagination
      const options: IPaginationOptions = {
        page: paginationRequest.page,
        limit: paginationRequest.limit,
      };

      const response = await paginate(userQueryBuilder, options);
      return { items: response.items, meta: response.meta };
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

}