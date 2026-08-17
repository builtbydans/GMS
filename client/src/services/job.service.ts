import { apiFetch } from "@/lib/api";
import { createJobService } from "@/services/job.api";

export const { getJobs, getJobById, transitionJob } =
  createJobService(apiFetch);
