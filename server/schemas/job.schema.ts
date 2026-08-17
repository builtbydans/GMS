import { z } from "zod";
import { JOB_STATUS, type JobStatus } from "../constants/job-status";

const jobStatuses = Object.values(JOB_STATUS) as [JobStatus, ...JobStatus[]];

export const transitionJobSchema = z.object({
  targetStatus: z.enum(jobStatuses),
  reason: z.string().trim().max(500).optional(),
});

module.exports = {
  transitionJobSchema,
};
