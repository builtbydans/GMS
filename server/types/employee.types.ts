export interface EmployeeDto {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EmployeeRecord extends EmployeeDto {
  pin_hash: string;
}

export interface CreateEmployeeDto {
  first_name: string;
  last_name: string;
  role: string;
  pin: string;
}

export interface CreateEmployeeRecordDto {
  first_name: string;
  last_name: string;
  role: string;
  pin_hash: string;
}

export interface UpdateEmployeeDto {
  first_name?: string;
  last_name?: string;
  role?: string;
  active?: boolean;
}

export interface UpdateEmployeePinDto {
  pin_hash: string;
}

export interface ChangeEmployeePinDto {
  pin: string;
}
