const supabase = require("../config/db/supabase");

const getCustomers = async () => {
  const { data, error } = await supabase.from("customers").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getCustomerById = async (id) => {
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

const findCustomerByEmail = async (email) => {
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

const findCustomerByPhone = async (phone) => {
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

const createCustomer = async (customerData) => {
  const { data, error } = await supabase
    .from("customers")
    .insert([customerData])
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      const duplicateError = new Error(
        "A customer with this email or phone number already exists.",
      );

      duplicateError.statusCode = 400;

      throw duplicateError;
    }

    const dbError = new Error(error.message);
    dbError.statusCode = 500;

    throw dbError;
  }

  return data;
};

const updateCustomerById = async (id, updatedData) => {
  const { data, error } = await supabase
    .from("customers")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

module.exports = {
  findCustomerByEmail,
  findCustomerByPhone,
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
};
