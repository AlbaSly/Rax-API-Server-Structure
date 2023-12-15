interface IResponse {
  status: number;
  msg: string;
}

/**
 * Interface for handling successful promise responses.
 */
export interface IResolve<T> extends IResponse{
  data: T;
}

/**
 * Interface for handling bad promise responses.
 */
export interface IReject extends IResponse {
  error: unknown;
}