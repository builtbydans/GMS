import { JobStatus } from "@/constants/job-status";
import { JobSummaryDto } from "@/types/job.types";
import { apiFetch } from "@/lib/api";

export const getJobs = async (): Promise<JobSummaryDto[]> => {
  const response = await apiFetch("/jobs", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const result = await response.json();

  return result.data;
};

export const getJobById = async (id: string): Promise<JobSummaryDto> => {
  const response = await apiFetch(`/jobs/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }

  const result = await response.json();

  return result.data;
};

export const updateJobStatus = async (id: string, status: JobStatus) => {
  const response = await apiFetch(`/jobs/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update job status");
  }

  return response.json();
};

export const startJob = async (id: string) => {
  const response = await apiFetch(`/jobs/${id}/start`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to start job");
  }

  return response.json();
};

export const completeJob = async (id: string) => {
  const response = await apiFetch(`/jobs/${id}/complete`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to complete job");
  }

  return response.json();
};
