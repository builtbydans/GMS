import "server-only";

import { apiFetch } from "@/lib/api.server";
import { createEmployeeService } from "@/services/employee.api";

export const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  editEmployeeById,
  deleteEmployeeById,
} = createEmployeeService(apiFetch);
