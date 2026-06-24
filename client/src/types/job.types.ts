import { JobUpdateDto } from "./job-update.types";
import { JobStatus } from "@/constants/job-status";

export interface CreateJobDto {
  vehicle_id: string;
  job_type: string;
  description?: string;
  estimated_cost?: number;
}
export interface UpdateJobDto {
  vehicle_id?: string;
  job_type?: string;
  description?: string;
  status?: JobStatus;
  estimated_cost?: number;
  actual_cost?: number;
}

export interface JobSummaryDto {
  id: string;
  job_number: string;
  status: JobStatus;
  created_at: string;
  quoted_cost: string | number | null;
  actual_cost: string | number | null;
  description: string | null;
  job_type: string | null;
  updated_at: string;
  updates: JobUpdateDto[];

  vehicles: {
    registration: string;
    make: string;
    model: string;

    customers: {
      first_name: string;
      last_name: string;
      phone: string;
      email: string;
    };
  };
}
