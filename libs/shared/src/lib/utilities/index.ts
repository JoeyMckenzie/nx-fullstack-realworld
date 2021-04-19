import { Maybe } from "../models";

export function isNullOrUndefined<T>(objectToValidate: Maybe<T>): boolean {
  return objectToValidate === null || objectToValidate === undefined;
}
