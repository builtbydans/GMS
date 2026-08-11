import { VehicleData, CreateVehicleDto } from "@/types/vehicle.types";
import { apiFetch } from "@/lib/api";

export const getVehicles = async (): Promise<VehicleData[]> => {
  const response = await apiFetch("/vehicles", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }

  const result = await response.json();

  return result.data;
};

export const createVehicle = async (vehicleData: CreateVehicleDto) => {
  const response = await apiFetch("/vehicles", {
    method: "POST",
    body: JSON.stringify(vehicleData),
  });

  if (!response.ok) {
    throw new Error("Failed to create customer");
  }

  return response.json();
};

export const getVehiclesByCustomerId = async (
  customerId: string,
): Promise<VehicleData[]> => {
  const response = await apiFetch(`/vehicles/customer/${customerId}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }

  const result = await response.json();

  return result.data;
};
