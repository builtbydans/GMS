import type { Response, NextFunction } from "express";
import supabase from "../config/db/supabase";
import type { AuthenticatedRequest } from "../types/auth.types";

const { AppError, ERROR_CODES } = require("../errors/AppError");

/**
 * Express middleware: prove the caller is a logged-in Supabase user.
 *
 * Flow:
 * 1. Read Authorization header → expect "Bearer <access_token>"
 * 2. Ask Supabase to verify that token (getUser)
 * 3. On success, put trusted identity on req.auth and call next()
 * 4. On failure, pass a 401 AppError to next(error)
 *
 * This does NOT protect routes by itself — you attach it to routers later (WSM-34).
 */
const authenticateMiddleware = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    // Headers can be string | string[] | undefined in Express
    const header = req.headers.authorization;

    if (!header || typeof header !== "string") {
      throw new AppError(
        "Authentication required",
        401,
        ERROR_CODES.UNAUTHORIZED,
      );
    }

    // Expected shape: "Bearer eyJhbGciOi..."
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError(
        "Authentication required",
        401,
        ERROR_CODES.UNAUTHORIZED,
      );
    }

    // CRITICAL: verify with Supabase — do not jwt.decode() and trust it
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new AppError(
        "Authentication required",
        401,
        ERROR_CODES.UNAUTHORIZED,
      );
    }

    // Trusted context for controllers — never take userId from the body
    req.auth = {
      userId: user.id,
      email: user.email ?? "",
    };

    // Success: hand off to the next middleware / route handler — exactly once
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticateMiddleware };
