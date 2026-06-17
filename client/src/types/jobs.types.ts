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
  status?: string;
  estimated_cost?: number;
  actual_cost?: number;
}
