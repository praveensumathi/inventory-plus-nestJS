import { ApiProperty } from "@nestjs/swagger";

export class PaginationRequest {
  @ApiProperty()
  page: number;
  @ApiProperty()
  take: number;
  @ApiProperty()
  searchTerm?: string;

  constructor(page: number = 1, take: number = 10, searchTerm?: string) {
    this.page = page;
    this.take = take;
    this.searchTerm = searchTerm;
  }
}
