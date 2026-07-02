import { API_URL } from "@/config/api";

export const getDashboardStats = async () => {
  const response = await fetch(`${API_URL}/dashboard/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data, please review");
  }

  const result = await response.json();
  return result.data;
};
