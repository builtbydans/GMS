import "server-only";

import { apiFetch } from "@/lib/api.server";
import { createCustomerService } from "@/services/customer.api";

export const {
  createCustomer,
  getCustomers,
  getCustomerById,
  getCustomerVehicleById,
  editCustomerById,
} = createCustomerService(apiFetch);
