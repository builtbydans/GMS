const API_URL = "http://localhost:3000";

export const getJobs = async () => {
  const response = await fetch(`${API_URL}/jobs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const result = await response.json();

  return result.data;
};

export const getJobById = async (id: string) => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }

  const result = await response.json();

  return result.data;
};

export const startJob = async (id: string) => {
  const response = await fetch(`${API_URL}/jobs/${id}/start`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to start job");
  }

  return response.json();
};
