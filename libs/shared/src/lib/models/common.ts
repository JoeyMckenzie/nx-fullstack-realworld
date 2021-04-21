export type Maybe<T> = T | undefined | null;

export type ApiErrors = string[];

// export interface ApiError {
//   errors: string[]
// };

export interface ApiError {
  message: string[];
  error: string;
  statusCode: number;
}
