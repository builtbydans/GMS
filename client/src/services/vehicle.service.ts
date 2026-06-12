import { VehicleData, CreateVehicleDto } from "@/types/vehicle.types";

const API_URL = "http://localhost:3000";

export const createVehicle = async (vehicleData: CreateVehicleDto) => {
  const response = await fetch(`${API_URL}/vehicles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const response = await fetch(`${API_URL}/vehicles/customer/${customerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }

  const result = await response.json();

  return result.data;
};
