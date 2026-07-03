import { API_URL } from "@/config/api";
import { WorkshopDashboardDto } from "@/types/dashboard.types";

export const getDashboardStats = async (): Promise<WorkshopDashboardDto> => {
  const response = await fetch(`${API_URL}/dashboard/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data, please review");
  }

  const result = await response.json();
  return result.data;
};
