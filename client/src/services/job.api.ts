import type { ApiFetch } from "@/lib/api-types";
import type { JobStatus } from "@/constants/job-status";
import type { JobSummaryDto } from "@/types/job.types";

export function createJobService(apiFetch: ApiFetch) {
  const getJobs = () =>
    apiFetch<JobSummaryDto[]>("/jobs", {
      method: "GET",
      cache: "no-store",
    });

  const getJobById = (id: string) =>
    apiFetch<JobSummaryDto>(`/jobs/${id}`, {
      method: "GET",
      cache: "no-store",
    });

  const transitionJob = (id: string, targetStatus: JobStatus, reason?: string) =>
    apiFetch<JobSummaryDto>(`/jobs/${id}/transitions`, {
      method: "POST",
      body: JSON.stringify({
        targetStatus,
        ...(reason ? { reason } : {}),
      }),
    });

  return {
    getJobs,
    getJobById,
    transitionJob,
  };
}
