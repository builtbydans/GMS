import supabase from "../../config/db/supabase";
const { AppError } = require("../../errors/AppError");

const getVehicles = async () => {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .is("deleted_at", null);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getVehicleById = async (id: string) => {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getVehiclesByCustomerId = async (customerId: string) => {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("customer_id", customerId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const createVehicle = async (vehicleData: any) => {
  const { data, error } = await supabase
    .from("vehicles")
    .insert(vehicleData)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      const duplicateError = new AppError(
        "A vehicle with this reg or customerId already exists.",
        400,
      );

      throw duplicateError;
    }

    const dbError = new AppError(error.message);
    throw dbError;
  }

  return data;
};

const findVehicleByReg = async (registration: string) => {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("registration", registration)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateVehicleById = async (id: string, updatedData: string) => {
  const { data, error } = await supabase
    .from("vehicles")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const deleteVehicleById = async (id: string) => {
  const { data, error } = await supabase
    .from("vehicles")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new AppError(error.message, 500);
  }

  return data;
};

module.exports = {
  getVehicles,
  getVehicleById,
  getVehiclesByCustomerId,
  createVehicle,
  findVehicleByReg,
  updateVehicleById,
  deleteVehicleById,
};
