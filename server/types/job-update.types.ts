export interface CreateJobUpdateDto {
  job_id: string;
  message: string;
}

export interface JobUpdateDto {
  id: string;
  job_id: string;
  message: string;
  created_at: string;
}
