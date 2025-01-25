import { ApiProperty } from "@nestjs/swagger";

export class CustomResponse<T> {
  @ApiProperty()
  data: T | null;
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;

  constructor(data: T | null, success: boolean, code: number, message: string) {
    this.data = data;
    this.success = success;
    this.statusCode = code;
    this.message = message;
  }
}

export class ResponseFactory {
  static success<T>(data: T = null, code: number = 200, message: string = "") {
    return new CustomResponse(data, true, code, message);
  }

  static error(message: string, code: number, data: null = null) {
    return new CustomResponse(data, false, code, message);
  }
}
