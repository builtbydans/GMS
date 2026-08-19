import { Request, Response, NextFunction } from "express";

const { AppError, ERROR_CODES } = require("../errors/AppError");

const notFoundMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const error = new AppError(
    `Route ${req.method} ${req.originalUrl} not found`,
    404,
    ERROR_CODES.NOT_FOUND,
  );

  next(error);
};

module.exports = { notFoundMiddleware };
