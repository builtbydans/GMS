import type { ApiFetch } from "@/lib/api-types";
import type {
  CreateEmployeeDto,
  EmployeeDto,
  UpdateEmployeeDto,
} from "@/types/employee.types";

export function createEmployeeService(apiFetch: ApiFetch) {
  const createEmployee = async (employeeData: CreateEmployeeDto) => {
    const response = await apiFetch("/employees", {
      method: "POST",
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error("Failed to create employee");
    }

    return response.json();
  };

  const getEmployees = async (): Promise<EmployeeDto[]> => {
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

  const getEmployeeById = async (id: string): Promise<EmployeeDto> => {
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

  const editEmployeeById = async (
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

  const deleteEmployeeById = async (id: string) => {
    const response = await apiFetch(`/employees/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete employee");
    }

    return response.json();
  };

  return {
    createEmployee,
    getEmployees,
    getEmployeeById,
    editEmployeeById,
    deleteEmployeeById,
  };
}
