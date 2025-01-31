import { IPaginationMeta, Pagination } from "nestjs-typeorm-paginate";
import { PaginationResponseDto } from "../dto/common.response";

/**
 * This function, paginateResponse, is a TypeScript utility that formats
 * paginated data by structuring the results and metadata, including total items,
 * current page, total pages, and items per page.
 */
export function paginateResponse<T>(
  data: [result: T[], total: number],
  page: number,
  take: number,
): PaginationResponseDto<T> {
  const [result, total] = data;
  const totalPages = Math.ceil(total / take);

  return {
    items: result,
    meta: {
      totalItems: total,
      currentPage: page,
      totalPages,
      itemsPerPage: take,
      itemCount: result.length,
    },
  };
}
