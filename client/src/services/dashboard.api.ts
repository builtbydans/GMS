import type { ApiFetch } from "@/lib/api-types";
import type { WorkshopDashboardDto } from "@/types/dashboard.types";

export function createDashboardService(apiFetch: ApiFetch) {
  const getDashboardStats = async (): Promise<WorkshopDashboardDto> => {
    const response = await apiFetch("/dashboard/stats", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data, please review");
    }

    const result = await response.json();
    return result.data;
  };

  return { getDashboardStats };
}
