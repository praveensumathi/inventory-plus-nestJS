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

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Clients)
    private readonly clientsRepo: Repository<Clients>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) { }

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
  async getClients() {

  }
}
