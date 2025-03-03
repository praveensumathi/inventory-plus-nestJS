import { applyDecorators, Type } from "@nestjs/common";
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiPropertyOptional,
  getSchemaPath,
} from "@nestjs/swagger";

export const ApiOkPaginatedResponse = <
  DataDto extends Type,
  PaginationResponse extends Type,
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
  DtoType extends Type,
  CustomResponseType extends Type,
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
            additionalProperties: false,
          },
        ],
        additionalProperties: false,
      },
    }),
  );
