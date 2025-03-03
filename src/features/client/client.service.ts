import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Clients, Customers } from "src/entities";
import { Like, Repository } from "typeorm";
import { ClientDataDto, ClientResponseDto } from "./dto/client.request";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Request } from "express";
import { ResponseFactory } from "src/common/dto/common.response";
import { NEW_ENTITY_ID } from "src/common/constants/constants";
import { PaginationRequest } from "src/common/dto/pagination.request";
import { paginateResponse } from "src/common/utils/pagination-util";
import { WhereCondition } from "src/common/types";
import { getLoggedInUserId } from "src/common/utils";
import { ClientPaginationResponse } from "./dto/client.response";

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Clients)
    private readonly clientsRepo: Repository<Clients>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async save(
    clientDto: ClientDataDto,
    customerId: string,
    req: Request,
  ): Promise<ClientResponseDto> {
    try {
      var clientEntity = await this.clientsRepo.findOne({
        where: {
          id: clientDto.id,
        },
      });

      if (clientEntity == null && clientDto.id != NEW_ENTITY_ID) {
        return ResponseFactory.error("Client Not Found");
      }

      var loggedInUserId = getLoggedInUserId(req);

      if (clientDto.id == NEW_ENTITY_ID) {
        clientEntity = this.mapper.map(clientDto, ClientDataDto, Clients);
        clientEntity.createdBy = loggedInUserId;

        var custometEntity = new Customers();
        custometEntity.id = customerId;
        clientEntity.customer = custometEntity;
      } else {
        this.mapper.mutate(clientDto, clientEntity, ClientDataDto, Clients);
        clientEntity.modifiedBy = loggedInUserId;
      }
      clientEntity = await this.clientsRepo.save(clientEntity);

      clientDto.id = clientEntity.id;
      return ResponseFactory.success(clientDto);
    } catch (error) {
      return ResponseFactory.error(error.message);
    }
  }

  async getClients(
    paginationRequest: PaginationRequest,
  ): Promise<ClientPaginationResponse> {
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

      var paginationResponse = paginateResponse(data, page, take);
      return ResponseFactory.success(paginationResponse);
    } catch (error) {
      throw ResponseFactory.error(`Error fetching clients: ${error.message}`);
    }
  }
}
