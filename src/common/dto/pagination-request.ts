export class PaginationRequest {
  page: number;
  limit: number;
  searchTerm?: string;

  constructor(page: number = 0, limit: number = 10, searchTerm?: string) {
    this.page = page;
    this.limit = limit;
    this.searchTerm = searchTerm;
  }
}
