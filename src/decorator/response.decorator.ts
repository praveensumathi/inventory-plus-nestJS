import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";

export const ApiOkPaginatedResponse = <
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

export const ApiOkCustomResponse = <
  DtoType extends Type<unknown>,
  CustomResponseType extends Type<unknown>,
>(
  dataDto: DtoType,
  customResonse: CustomResponseType,
) =>
  applyDecorators(
    ApiExtraModels(customResonse, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(customResonse) },
          {
            properties: {
              data: { $ref: getSchemaPath(dataDto) },
            },
          },
        ],
      },
    }),
  );
