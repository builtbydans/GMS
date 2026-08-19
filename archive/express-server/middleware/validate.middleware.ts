import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { AppError, ERROR_CODES } from "../errors/AppError";

/**
 * Returns Express middleware that validates req.body against a Zod schema.
 * On success, replaces req.body with the parsed (trimmed/transformed) value.
 */
export const validateBody = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details: Record<string, string[]> = {};

      for (const issue of result.error.issues) {
        const key = issue.path.join(".") || "body";
        if (!details[key]) details[key] = [];
        details[key].push(issue.message);
      }

      return next(
        new AppError(
          "Validation failed",
          400,
          ERROR_CODES.VALIDATION_ERROR,
          details,
        ),
      );
    }

    req.body = result.data;
    next();
  };
};

module.exports = { validateBody };
