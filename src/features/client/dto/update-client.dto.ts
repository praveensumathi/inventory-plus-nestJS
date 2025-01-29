import { PartialType } from "@nestjs/swagger";
import { BaseClientDto } from "./create-client.dto";

export class UpdateClientDto extends PartialType(BaseClientDto) {}
