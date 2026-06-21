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

export interface JobSummaryDto {
  id: string;
  job_number: string;
  status: string;
  created_at: string;
  quoted_cost: string;
  actual_cost: string;
  description: string;
  job_type: string;
  updated_at: string;

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
