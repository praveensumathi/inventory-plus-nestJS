import { Type } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export type ClassType<T = any> = new (...args: any[]) => T;

export class BaseResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export class CustomResponse<T = unknown> extends BaseResponse {
  @ApiProperty({ type: () => Object })
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
  static success<T = null, R extends CustomResponse<T> = CustomResponse<T>>(
    data: T = null,
    responseType?: ClassType<R>,
    code: number = 200,
    message: string = "Success",
  ) {
    const response = (
      responseType ? Object.create(responseType.prototype) : {}
    ) as R;
    response.data = data;
    response.success = true;
    response.statusCode = code;
    response.message = message;
    return response;
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
  @ApiProperty({ type: () => [Object] })
  items: T[];

  @ApiProperty({ type: () => PaginationMeta })
  meta: PaginationMeta;
}
