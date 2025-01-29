import { Injectable } from "@nestjs/common";
import { UpdateClientDto } from "./dto/update-client.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Clients, Customers } from "src/entities";
import { Repository } from "typeorm";
import { CreateClientDto } from "./dto/create-client.dto";
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

  async create(
    createClientDto: CreateClientDto,
    req: Request,
  ): Promise<CustomResponse> {
    try {
      console.log(createClientDto);

      var newClientEntity = this.mapper.map(
        createClientDto,
        CreateClientDto,
        Clients,
      );

      newClientEntity.createdBy = req.user["sub"];

      console.log(newClientEntity);

      newClientEntity = await this.clientsRepo.save(newClientEntity);
      return ResponseFactory.success();
    } catch (error) {
      console.log(error);

      return ResponseFactory.error("Error while Save Client");
    }
  }

  async update(
    id: string,
    updateClientDto: UpdateClientDto,
    req: Request,
  ): Promise<CustomResponse> {
    try {
      var result = await this.clientsRepo.update(id, {
        ...updateClientDto,
        modifiedBy: req.user["sub"],
      });

      if (result.affected > 0) {
        return ResponseFactory.success();
      }

      return ResponseFactory.error("Error While Update Client");
    } catch (error) {
      return ResponseFactory.error("Error While Update Client");
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
