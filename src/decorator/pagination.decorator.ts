import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";

export const ApiOkResponsePaginated = <
  DataDto extends Type<unknown>,
  PaginationResponse extends Type<unknown>,
>(
  dataDto: DataDto,
  paginationResonse: PaginationResponse,
) =>
  applyDecorators(
    ApiExtraModels(paginationResonse, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(paginationResonse) }],
      },
    }),
  );
