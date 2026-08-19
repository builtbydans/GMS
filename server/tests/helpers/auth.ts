import { createWorkshopToken } from "../../lib/workshop-token";
import type { ActorRole } from "../../constants/job-status";

/**
 * Builds a Bearer token for integration tests.
 * Uses the same workshop token format as the real login flow.
 */
export const authHeader = (employeeId: string, role: ActorRole) => ({
  Authorization: `Bearer ${createWorkshopToken(employeeId, role)}`,
});

export const managerAuth = () => authHeader("emp-manager-1", "MANAGER");

export const technicianAuth = (employeeId = "emp-tech-1") =>
  authHeader(employeeId, "TECHNICIAN");
