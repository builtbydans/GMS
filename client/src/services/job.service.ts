import { JobStatus } from "@/constants/job-status";
import { JobSummaryDto } from "@/types/job.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const contentType = response.headers.get("content-type");
  const result = contentType?.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(
      result?.message ?? `Job request failed with status ${response.status}`,
    );
  }

  return (result as ApiResponse<T>).data;
};

export const getJobs = () =>
  request<JobSummaryDto[]>("/jobs", {
    method: "GET",
    cache: "no-store",
  });

export const getJobById = (id: string) =>
  request<JobSummaryDto>(`/jobs/${id}`, {
    method: "GET",
    cache: "no-store",
  });

export const updateJobStatus = (id: string, status: JobStatus) =>
  request<JobSummaryDto>(`/jobs/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const startJob = (id: string) =>
  request<JobSummaryDto>(`/jobs/${id}/start`, {
    method: "PATCH",
  });

export const completeJob = (id: string) =>
  request<JobSummaryDto>(`/jobs/${id}/complete`, {
    method: "PATCH",
  });
