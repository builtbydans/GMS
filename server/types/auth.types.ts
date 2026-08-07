import type { Request } from "express";

export interface AuthContext {
  userId: string;
  email: string;
  role?: "MANAGER" | "ADMIN" | "TECHNICIAN";
}

export interface AuthenticatedRequest extends Request {
  auth: AuthContext;
}
