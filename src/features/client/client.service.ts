import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Clients } from "src/entities";
import { Like, Repository } from "typeorm";
import { ClientDto } from "./dto/create-client.dto";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Request } from "express";
import {
  CustomResponse,
  ResponseFactory,
} from "src/common/dto/common-response";
import { CREATE_ID } from "src/common/constants/constants";
import { Pagination } from "nestjs-typeorm-paginate";
import { PaginationRequest } from "src/common/dto/pagination-request";
import { paginateResponse } from "src/common/utils/pagination-util";
import { WhereCondition } from "src/common/types";
import { getLoggedInUserId } from "src/common/utils";

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Clients)
    private readonly clientsRepo: Repository<Clients>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async save(
    clientDto: ClientDto,
    customerId: string,
    req: Request,
  ): Promise<CustomResponse> {
    try {
      var clientEntity = await this.clientsRepo.findOne({
        where: {
          id: clientDto.id,
        },
      });

      clientEntity ??= new Clients();

      if (clientDto.id == CREATE_ID) {
        clientEntity = this.mapper.map(clientDto, ClientDto, Clients);
        clientEntity.createdBy = getLoggedInUserId(req);
        clientEntity.customer.id = customerId;
      } else {
        this.mapper.mutate(clientDto, clientEntity, ClientDto, Clients);
        clientEntity.modifiedBy = getLoggedInUserId(req);
      }
      clientEntity = await this.clientsRepo.save(clientEntity);

      return ResponseFactory.success(clientEntity);
    } catch (error) {
      return ResponseFactory.error(error.message);
    }
  }

  async getClients(
    paginationRequest: PaginationRequest,
  ): Promise<Pagination<Clients>> {
    try {
      const { page, take, searchTerm } = paginationRequest;
      const skip = (page - 1) * take;

      let whereConditions: WhereCondition<Clients> = {};

      if (searchTerm.trim()) {
        const searchCondition = Like(`%${searchTerm}%`);
        whereConditions = [
          { email: searchCondition },
          { name: searchCondition },
          { telephone: searchCondition },
          { company: searchCondition },
        ];
      }

      const data = await this.clientsRepo.findAndCount({
        where: whereConditions,
        select: {
          id: true,
          email: true,
          name: true,
          telephone: true,
          company: true,
          addressLine1: true,
          addressLine2: true,
          city: true,
          county: true,
          postCode: true,
          country: true,
        },
        take: take,
        skip: skip,
      });

      return paginateResponse(data, page, take);
    } catch (error) {
      throw new Error(`Error fetching clients: ${error.message}`);
    }
  }
}
