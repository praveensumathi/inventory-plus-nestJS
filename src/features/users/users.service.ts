import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customers, Users } from "src/entities";
import { Like, Repository } from "typeorm";
import { CreateUserRequestDto } from "./dto/user.request";
import {
  CustomResponse,
  ResponseFactory,
} from "src/common/dto/common-response";
import { getPropertyName, isNotEmpty } from "src/common/utils/common-util";
import { CustomerUsers } from "src/entities/CustomerUsers";
import { PasswordUtil } from "src/common/utils";
import { UserCustomers } from "../auth/dto/auth-response.dto";
import { RolesEnum } from "src/common/enums/enum";
import { PaginationRequest } from "src/common/dto/pagination-request";
import { IPaginationMeta, Pagination } from "nestjs-typeorm-paginate";
import { paginateResponse } from "src/common/utils/pagination-util";

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

  async getUsers(
    paginationRequest: PaginationRequest,
    customerId: string,
  ): Promise<Pagination<CustomerUsers, IPaginationMeta>> {
    const { page, take, searchTerm } = paginationRequest

    try {

      const whereCondition: any = {
        customer: { id: customerId },
      };

      if (searchTerm) {
        const searchCondition = Like(`%${searchTerm}%`);
        whereCondition.user = [
          { email: searchCondition },
          { name: searchCondition },
          { mobile: searchCondition },
        ];
      }

      const skip = (page - 1) * take;

      const data = await this.customerUsersRepo.findAndCount({
        where: whereCondition,
        relations: [
          'user'
        ],
        select: {
          user: {
            id: true,
            email: true,
            name: true,
            mobile: true,
          },
        },
        take: take,
        skip: skip,
      });

      return paginateResponse(
        data,
        page,
        take,
      );
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
}

