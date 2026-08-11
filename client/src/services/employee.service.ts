import {
  ChangeEmployeePinDto,
  CreateEmployeeDto,
  EmployeeDto,
  UpdateEmployeeDto,
} from "@/types/employee.types";
import { apiFetch } from "@/lib/api";

export const createEmployee = async (employeeData: CreateEmployeeDto) => {
  const response = await apiFetch("/employees", {
    method: "POST",
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    throw new Error("Failed to create employee");
  }

  return response.json();
};

export const getEmployees = async (): Promise<EmployeeDto[]> => {
  const response = await apiFetch("/employees", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const result = await response.json();

  return result.data;
};

export const getEmployeeById = async (id: string): Promise<EmployeeDto> => {
  const response = await apiFetch(`/employees/${id}`, {
    method: "GET",
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
  const response = await apiFetch(`/employees/${id}`, {
    method: "PUT",
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
  const response = await apiFetch(`/employees/${id}/pin`, {
    method: "PATCH",
    body: JSON.stringify(pinData),
  });

  if (!response.ok) {
    throw new Error("Failed to change employee PIN");
  }

  return response.json();
};

export const deleteEmployeeById = async (id: string) => {
  const response = await apiFetch(`/employees/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }

  return response.json();
};
