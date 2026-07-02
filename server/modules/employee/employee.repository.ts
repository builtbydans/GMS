import supabase from "../../config/db/supabase";
const AppError = require("../../errors/AppError");
import {
  CreateEmployeeRecordDto,
  UpdateEmployeeDto,
  UpdateEmployeePinDto,
} from "../../types/employee.types";

const getEmployees = async () => {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("active", true);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getEmployeeById = async (id: string) => {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const createEmployee = async (employeeData: CreateEmployeeRecordDto) => {
  const { data, error } = await supabase
    .from("employees")
    .insert([employeeData])
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new AppError("An employee with these details already exists.", 400);
    }

    throw new AppError(error.message, 500);
  }

  return data;
};

const updateEmployeePin = async (id: string, pinData: UpdateEmployeePinDto) => {
  const { data, error } = await supabase
    .from("employees")
    .update({
      ...pinData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("active", true)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateEmployee = async (id: string, updatedData: UpdateEmployeeDto) => {
  const { data, error } = await supabase
    .from("employees")
    .update({
      ...updatedData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("active", true)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const deleteEmployee = async (id: string) => {
  const deletedAt = new Date().toISOString();

  const { data, error } = await supabase
    .from("employees")
    .update({
      active: false,
      deleted_at: deletedAt,
      updated_at: deletedAt,
    })
    .eq("id", id)
    .eq("active", true)
    .select()
    .single();

  if (error) {
    throw new AppError(error.message, 500);
  }

  return data;
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  updateEmployeePin,
  deleteEmployee,
};
