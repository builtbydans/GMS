const employeeRepository = require("./employee.repository");
const auditRepository = require("../audit/audit.repository");
const AppError = require("../../errors/AppError");

import {
  CreateEmployeeDto,
  EmployeeDto,
  EmployeeRecord,
  UpdateEmployeeDto,
} from "../../types/employee.types";

const EMPLOYEE_ROLES = ["MANAGER", "TECHNICIAN", "ADMIN"] as const;

const toEmployeeDto = (employee: EmployeeRecord): EmployeeDto => employee;

const validateRole = (role: string) => {
  if (!EMPLOYEE_ROLES.includes(role as (typeof EMPLOYEE_ROLES)[number])) {
    throw new AppError("Invalid employee role.", 400);
  }
};

const getEmployees = async (): Promise<EmployeeDto[]> => {
  const employees = await employeeRepository.getEmployees();

  return employees.map(toEmployeeDto);
};

const getEmployeeById = async (id: string): Promise<EmployeeDto> => {
  const employee = await employeeRepository.getEmployeeById(id);

  if (!employee) {
    throw new AppError("Employee not found.", 404);
  }

  return toEmployeeDto(employee);
};

const createEmployee = async (
  employeeData: CreateEmployeeDto,
): Promise<EmployeeDto> => {
  const firstName = employeeData.first_name.trim();
  const lastName = employeeData.last_name.trim();
  const role = employeeData.role.trim().toUpperCase();

  if (!firstName || !lastName) {
    throw new AppError("First name and last name are required.", 400);
  }

  validateRole(role);

  const employee = await employeeRepository.createEmployee({
    first_name: firstName,
    last_name: lastName,
    role,
  });

  const employeeDto = toEmployeeDto(employee);

  await auditRepository.createAuditLog({
    entity_type: "employee",
    entity_id: employee.id,
    action: "CREATE",
    old_value: null,
    new_value: employeeDto,
  });

  return employeeDto;
};

const updateEmployee = async (
  id: string,
  updatedData: UpdateEmployeeDto,
): Promise<EmployeeDto> => {
  const existingEmployee = await employeeRepository.getEmployeeById(id);

  if (!existingEmployee) {
    throw new AppError("Employee not found.", 404);
  }

  const validatedData: UpdateEmployeeDto = {};

  if (updatedData.first_name !== undefined) {
    const firstName = updatedData.first_name.trim();

    if (!firstName) {
      throw new AppError("First name cannot be empty.", 400);
    }

    validatedData.first_name = firstName;
  }

  if (updatedData.last_name !== undefined) {
    const lastName = updatedData.last_name.trim();

    if (!lastName) {
      throw new AppError("Last name cannot be empty.", 400);
    }

    validatedData.last_name = lastName;
  }

  if (updatedData.role !== undefined) {
    const role = updatedData.role.trim().toUpperCase();

    validateRole(role);

    validatedData.role = role;
  }

  if (updatedData.active !== undefined) {
    validatedData.active = updatedData.active;
  }

  if (Object.keys(validatedData).length === 0) {
    throw new AppError("No valid employee update provided.", 400);
  }

  const updatedEmployee = await employeeRepository.updateEmployee(
    id,
    validatedData,
  );

  const oldEmployeeDto = toEmployeeDto(existingEmployee);
  const newEmployeeDto = toEmployeeDto(updatedEmployee);

  await auditRepository.createAuditLog({
    entity_type: "employee",
    entity_id: id,
    action: "UPDATE",
    old_value: oldEmployeeDto,
    new_value: newEmployeeDto,
  });

  return newEmployeeDto;
};

const deleteEmployee = async (id: string): Promise<EmployeeDto> => {
  const existingEmployee = await employeeRepository.getEmployeeById(id);

  if (!existingEmployee) {
    throw new AppError("Employee not found.", 404);
  }

  const deletedEmployee = await employeeRepository.deleteEmployee(id);

  const oldEmployeeDto = toEmployeeDto(existingEmployee);
  const newEmployeeDto = toEmployeeDto(deletedEmployee);

  await auditRepository.createAuditLog({
    entity_type: "employee",
    entity_id: id,
    action: "DELETE",
    old_value: oldEmployeeDto,
    new_value: newEmployeeDto,
  });

  return newEmployeeDto;
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
