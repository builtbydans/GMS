import "server-only";

import { apiFetch } from "@/lib/api.server";
import { createVehicleService } from "@/services/vehicle.api";

export const { getVehicles, createVehicle, getVehiclesByCustomerId } =
  createVehicleService(apiFetch);
