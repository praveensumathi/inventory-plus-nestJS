import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class InspectionRequestDto {
    @ApiProperty({ default: "0" })
    @AutoMap()
    id: string;

    @AutoMap()
    name?: string;

    @AutoMap()
    template?: number;

    @AutoMap()
    type?: number;

    @AutoMap()
    locationOfKeys?: string;

    @AutoMap()
    keyReturnInstruction?: string;

    @AutoMap()
    notes?: string;

    propertyId: string;
}