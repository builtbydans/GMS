import { JobStatus } from "../constants/job-status";

export interface CreateJobDto {
  vehicle_id: string;
  job_type?: string;
  description?: string;
}

export interface UpdateJobDto {
  vehicle_id?: string;
  job_type?: string;
  description?: string;
  status?: JobStatus;

  quoted_cost?: number;
  deposit_amount?: number;
  deposit_received_at?: string;
}
