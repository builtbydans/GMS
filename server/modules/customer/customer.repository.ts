const supabase = require("../../config/db/supabase");
const AppError = require("../../errors/AppError");

const getCustomers = async () => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false })
    .is("deleted_at", null);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getCustomerById = async (id: string) => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const findCustomerByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const findCustomerByPhone = async (phone: string) => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("phone", phone)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const createCustomer = async (customerData: Array<String>) => {
  const { data, error } = await supabase
    .from("customers")
    .insert([customerData])
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      const duplicateError = new AppError(
        "A customer with this email or phone number already exists.",
        400,
      );

      throw duplicateError;
    }

    const dbError = new AppError(error.message);
    throw dbError;
  }

  return data;
};

const updateCustomerById = async (id: string, updatedData: string) => {
  const { data, error } = await supabase
    .from("customers")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const deleteCustomerById = async (id: string) => {
  const { data, error } = await supabase
    .from("customers")
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
  findCustomerByEmail,
  findCustomerByPhone,
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
