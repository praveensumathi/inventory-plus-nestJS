import { ApiProperty } from "@nestjs/swagger";
import { IPaginationMeta, Pagination } from "nestjs-typeorm-paginate";

export class BaseResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export class CustomResponse<T = unknown> extends BaseResponse {
  @ApiProperty({ isArray: true, default: [], type: Object })
  data: T | null;

  constructor(data: T | null, success: boolean, code: number, message: string) {
    super();
    this.data = data;
    this.success = success;
    this.statusCode = code;
    this.message = message;
  }
}

export class ResponseFactory {
  static success<T = unknown>(
    data: T = null,
    code: number = 200,
    message: string = "Success",
  ) {
    return new CustomResponse(data, true, code, message);
  }

  static error(
    message: string = "Error",
    code: number = -1,
    data: null = null,
  ) {
    return new CustomResponse(data, false, code, message);
  }
}

export class PaginationMeta {
  /**
   * the amount of items on this specific page
   */
  @ApiProperty()
  itemCount: number;
  /**
   * the total amount of items
   */
  @ApiProperty()
  totalItems?: number;
  /**
   * the amount of items that were requested per page
   */
  @ApiProperty()
  itemsPerPage: number;

  /**
   * the total amount of pages in this paginator
   */
  @ApiProperty()
  totalPages?: number;
  /**
   * the current page this paginator "points" to
   */
  @ApiProperty()
  currentPage: number;
}

export class PaginationResponseDto<T> {
  @ApiProperty({ isArray: true, default: [], type: [Object] })
  items: T[];

  @ApiProperty({ type: () => PaginationMeta })
  meta: PaginationMeta;
}
