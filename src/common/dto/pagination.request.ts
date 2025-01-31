import { ApiProperty } from "@nestjs/swagger";

export class PaginationRequest {
  @ApiProperty({ default: 1 })
  page: number;
  @ApiProperty({ default: 10 })
  take: number;
  @ApiProperty({ default: "" })
  searchTerm?: string;

  constructor(page: number = 1, take: number = 10, searchTerm?: string) {
    this.page = page;
    this.take = take;
    this.searchTerm = searchTerm;
  }
}
