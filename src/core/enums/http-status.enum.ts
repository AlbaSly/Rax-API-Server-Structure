/**
 * Namespace containing HTTP status codes grouped by their respective categories.
 * @namespace HttpStatus
 */
export namespace HttpStatus {

  /**
   * Enum representing informational status codes.
   * @enum {number}
   */
  export enum Info {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
  }

  /**
   * Enum representing success status codes.
   * @enum {number}
   */
  export enum Success {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
  }

  /**
   * Enum representing redirection status codes.
   * @enum {number}
   */
  export enum RedirectionCodes {
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    NOT_MODIFIED = 304,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
  }

  /**
   * Enum representing client error status codes.
   * @enum {number}
   */
  export enum Client {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    GONE = 410,
    TOO_MANY_REQUESTS = 429,
  }

  /**
   * Enum representing server error status codes.
   * @enum {number}
   */
  export enum Server{
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
  }
}
