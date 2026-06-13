const API_URL = "http://localhost:3000";

export const getDashboardStats = async () => {
  const response = await fetch(`${API_URL}/dashboard/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  const result = await response.json();
  return result.data;
};
