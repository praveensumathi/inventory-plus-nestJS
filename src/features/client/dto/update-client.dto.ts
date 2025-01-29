import { PartialType } from '@nestjs/swagger';
import { CreateUpdateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateUpdateClientDto) { }
