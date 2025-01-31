import { FindOptionsWhere } from "typeorm";

type WhereCondition<T> = FindOptionsWhere<T> | FindOptionsWhere<T>[];

export {
    WhereCondition
}
