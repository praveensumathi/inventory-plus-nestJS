import { Injectable } from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateUpdateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Clients)
    private readonly clientsRepository: Repository<Clients>,
  ) { }

  async saveClient(createClientDto: CreateUpdateClientDto) {
    console.log({ createClientDto });

    if (createClientDto.id) {
      const { id } = createClientDto
      const existingClient = await this.clientsRepository.findOneBy({ id });
      if (existingClient) {
        return this.clientsRepository.update(id, createClientDto);
      }
    } else {
      const newClient = this.clientsRepository.create(createClientDto);
      return this.clientsRepository.save(newClient);
    }
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
