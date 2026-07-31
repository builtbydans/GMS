import { Request, Response, NextFunction } from "express";
import { AppError, ERROR_CODES } from "../errors/AppError";

const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isProduction = process.env.NODE_ENV === "production";

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message,
      ...(err.details && { details: err.details }),
      ...(!isProduction && { stack: err.stack }),
    });
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    code: ERROR_CODES.INTERNAL_SERVER_ERROR,
    message: "An unexpected error occurred",
    ...(!isProduction &&
      err instanceof Error && {
        stack: err.stack,
      }),
  });
};

module.exports = { errorMiddleware };
