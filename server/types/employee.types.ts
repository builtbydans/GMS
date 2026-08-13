export interface EmployeeDto {
  id: string;
  user_id: string | null;
  first_name: string;
  last_name: string;
  role: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type EmployeeRecord = EmployeeDto;

export interface CreateEmployeeDto {
  first_name: string;
  last_name: string;
  role: string;
}

export interface CreateEmployeeRecordDto {
  first_name: string;
  last_name: string;
  role: string;
}

export interface UpdateEmployeeDto {
  first_name?: string;
  last_name?: string;
  role?: string;
  active?: boolean;
}
