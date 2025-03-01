import { FindOptionsWhere } from "typeorm";

type WhereCondition<T> = FindOptionsWhere<T> | FindOptionsWhere<T>[];

type JWTPayloadType = {
  sub: string;
  userName: string;
  iat?: number;
  email: string;
};

export { WhereCondition, JWTPayloadType };
