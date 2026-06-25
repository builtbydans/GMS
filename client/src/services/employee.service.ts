import {
  ChangeEmployeePinDto,
  CreateEmployeeDto,
  EmployeeDto,
  UpdateEmployeeDto,
} from "@/types/employee.types";

const API_URL = "http://localhost:3000";

export const createEmployee = async (employeeData: CreateEmployeeDto) => {
  const response = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    throw new Error("Failed to create employee");
  }

  return response.json();
};

export const getEmployees = async (): Promise<EmployeeDto[]> => {
  const response = await fetch(`${API_URL}/employees`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const result = await response.json();

  return result.data;
};

export const getEmployeeById = async (id: string): Promise<EmployeeDto> => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch employee");
  }

  const result = await response.json();

  return result.data;
};

export const editEmployeeById = async (
  id: string,
  employeeData: UpdateEmployeeDto,
) => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }

  return response.json();
};

export const changeEmployeePin = async (
  id: string,
  pinData: ChangeEmployeePinDto,
) => {
  const response = await fetch(`${API_URL}/employees/${id}/pin`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pinData),
  });

  if (!response.ok) {
    throw new Error("Failed to change employee PIN");
  }

  return response.json();
};

export const deleteEmployeeById = async (id: string) => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }

  return response.json();
};
