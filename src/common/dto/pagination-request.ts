export class PaginationRequest {
  page: number;
  take: number;
  searchTerm?: string;

  constructor(page: number = 1, take: number = 10, searchTerm?: string) {
    this.page = page;
    this.take = take;
    this.searchTerm = searchTerm;
  }
}
