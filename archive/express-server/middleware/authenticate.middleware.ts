import type { Response, NextFunction } from "express";
import supabase from "../config/db/supabase";
import type { AuthenticatedRequest } from "../types/auth.types";
import { readWorkshopToken } from "../lib/workshop-token";

const employeeRepository = require("../modules/employee/employee.repository");
const { AppError, ERROR_CODES } = require("../errors/AppError");

const authenticateMiddleware = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers.authorization;

    if (!header || typeof header !== "string") {
      throw new AppError(
        "Authentication required",
        401,
        ERROR_CODES.UNAUTHORIZED,
      );
    }

    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError(
        "Authentication required",
        401,
        ERROR_CODES.UNAUTHORIZED,
      );
    }

    const workshopSession = readWorkshopToken(token);

    if (workshopSession) {
      req.auth = {
        userId: workshopSession.employeeId,
        email: "",
        role: workshopSession.role,
        employeeId: workshopSession.employeeId,
      };
      next();
      return;
    }

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

    const employee = await employeeRepository.getEmployeeByUserId(user.id);
    const role = employee?.role?.trim().toUpperCase();

    req.auth = {
      userId: user.id,
      email: user.email ?? "",
      employeeId: employee?.id,
      role:
        role === "MANAGER" || role === "ADMIN" || role === "TECHNICIAN"
          ? role
          : undefined,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticateMiddleware };
