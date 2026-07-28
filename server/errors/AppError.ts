const ERROR_CODES = {
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_STATUS_TRANSITION: "INVALID_STATUS_TRANSITION",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

type ErrorDetails = Record<string, string[]>;

class AppError extends Error {
  statusCode: number;
  code: ErrorCode;
  details?: ErrorDetails;

  constructor(
    message: string,
    statusCode: number,
    code: ErrorCode,
    details?: ErrorDetails,
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

module.exports = {
  AppError,
  ERROR_CODES,
};
