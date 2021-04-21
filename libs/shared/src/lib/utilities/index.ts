import { Maybe } from '../models';

export function isNullOrUndefined<T>(objectToValidate: Maybe<T>): boolean {
  return objectToValidate === null || objectToValidate === undefined;
}

export function isStringNullUndefinedOrEmpty(
  stringToValidate: Maybe<string>
): boolean {
  return typeof stringToValidate === 'string'
    ? stringToValidate.length === 0
    : isNullOrUndefined(stringToValidate);
}
