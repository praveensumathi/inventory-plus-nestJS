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

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Clients)
    private readonly clientsRepo: Repository<Clients>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async save(clientDto: ClientDto, req: Request): Promise<CustomResponse> {
    try {
      var clientEntity = this.mapper.map(clientDto, ClientDto, Clients);

      if (clientEntity.id == null || clientEntity.id == undefined) {
        clientEntity.createdBy = req.user["sub"];
      } else {
        clientEntity.modifiedBy = req.user["sub"];
        delete clientEntity.customer.id;
      }
      clientEntity = await this.clientsRepo.save(clientEntity);

      return ResponseFactory.success();
    } catch (error) {
      console.log(error);

      return ResponseFactory.error("Error while Save Client");
    }
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
