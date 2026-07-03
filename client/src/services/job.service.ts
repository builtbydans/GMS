import { JobStatus } from "@/constants/job-status";
import { JobSummaryDto } from "@/types/job.types";
import { API_URL } from "@/config/api";

export const getJobs = async (): Promise<JobSummaryDto[]> => {
  const response = await fetch(`${API_URL}/jobs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const result = await response.json();

  return result.data;
};

export const getJobById = async (id: string): Promise<JobSummaryDto> => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }

  const result = await response.json();

  return result.data;
};

export const updateJobStatus = async (id: string, status: JobStatus) => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update job status");
  }

  return response.json();
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

export const completeJob = async (id: string) => {
  const response = await fetch(`${API_URL}/jobs/${id}/complete`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to complete job");
  }

  return response.json();
};
