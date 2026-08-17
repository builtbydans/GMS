import "server-only";

import { apiFetch } from "@/lib/api.server";
import { createJobService } from "@/services/job.api";

export const { getJobs, getJobById, transitionJob } =
  createJobService(apiFetch);
