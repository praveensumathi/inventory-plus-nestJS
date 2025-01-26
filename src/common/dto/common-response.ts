import { ApiProperty } from "@nestjs/swagger";

export class BaseResponse {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}

export class CustomResponse<T = unknown> extends BaseResponse {
  @ApiProperty()
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
