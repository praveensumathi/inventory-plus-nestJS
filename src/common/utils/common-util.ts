import { Request } from "express";

/**
 * Checks if the provided value is not null, undefined, or empty.
 *
 * This utility function supports various data types and determines emptiness as follows:
 * - For `null` or `undefined`, it returns `false`.
 * - For objects, it checks if the object has at least one key.
 * - For arrays, it checks if the array has at least one element.
 * - For strings, it trims the string and checks if it has a length greater than 0.
 * - For other data types (e.g., numbers, booleans), it assumes the value is not empty.
 *
 * @template T - The type of the value to be checked.
 * @param {T} value - The value to check for non-emptiness.
 * @returns {boolean} - Returns `true` if the value is not null, undefined, or empty, otherwise `false`.
 *
 * @example
 * isNotEmpty({ key: 'value' }); // true
 * isNotEmpty({}); // false
 * isNotEmpty([1, 2, 3]); // true
 * isNotEmpty([]); // false
 * isNotEmpty('Hello'); // true
 * isNotEmpty(''); // false
 * isNotEmpty(0); // true
 * isNotEmpty(null); // false
 * isNotEmpty(undefined); // false
 */
export function isNotEmpty<T>(value: T): boolean {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    return Object.keys(value).length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return true;
}

/**
 *This custom function, getPropertyName, is a TypeScript utility 
 that helps retrieve the name of a property from a given object in a type-safe manner.
 */
export function getPropertyName<T extends object>(
  o: T,
  expression: (x: { [Property in keyof T]: string }) => string,
) {
  const res = {} as { [Property in keyof T]: string };
  Object.keys(o).map((k) => (res[k as keyof T] = k));
  return expression(res);
}

export function getLoggedInUserId(req: Request): string {
  return req.user["sub"];
}

export function transformDataToDto<S extends D, D>(
  data: [S[], number],
): [D[], number] {
  const [result, total] = data;
  return [result.map((item) => ({ ...item }) as D), total];
}
