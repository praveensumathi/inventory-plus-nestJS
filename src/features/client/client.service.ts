import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Clients } from "src/entities";
import { Repository } from "typeorm";
import { ClientDto } from "./dto/create-client.dto";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Request } from "express";
import {
  CustomResponse,
  ResponseFactory,
} from "src/common/dto/common-response";
import { CREATE_ID } from "src/common/constants/constants";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from "nestjs-typeorm-paginate";
import { PaginationRequest } from "src/common/dto/pagination-request";

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
        clientEntity.createdBy = req.user["sub"];
        clientEntity.customer.id = customerId;
      } else {
        this.mapper.mutate(clientDto, clientEntity, ClientDto, Clients);
        clientEntity.modifiedBy = req.user["sub"];
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
      const queryBuilder = this.clientsRepo
        .createQueryBuilder("clients")
        .select(["clients.name", "clients.email", "clients.telephone"]);

      if (paginationRequest.searchTerm) {
        queryBuilder.where(
          "clients.name ILIKE :searchTerm OR clients.email ILIKE :searchTerm",
          {
            searchTerm: `%${paginationRequest.searchTerm}%`,
          },
        );
      }
      const options: IPaginationOptions = {
        page: paginationRequest.page,
        limit: paginationRequest.take,
      };

      const response = await paginate(queryBuilder, options);
      return { items: response.items, meta: response.meta };
    } catch (error) {
      throw new Error(`Error fetching clients: ${error.message}`);
    }
  }
}
