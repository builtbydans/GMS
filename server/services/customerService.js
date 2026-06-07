const customerRepository = require("../repositories/customerRepository");

const getCustomers = async () => {
  return customerRepository.getCustomers();
};

const getCustomerById = async (id) => {
  const customer = await customerRepository.getCustomerById(id);

  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  return customer;
};

const createCustomer = async (customerData) => {
  let { first_name, last_name, phone, email } = customerData;

  first_name = first_name?.trim();
  last_name = last_name?.trim();
  phone = phone?.trim();
  email = email?.trim().toLowerCase();

  if (!first_name || !last_name) {
    const error = new Error("First name and last name are required");
    error.statusCode = 400;
    throw error;
  }

  const existingCustomer = await customerRepository.findCustomerByEmail(email);

  if (existingCustomer) {
    const error = new Error("A customer with this email already exists");

    error.statusCode = 400;
    throw error;
  }

  return customerRepository.createCustomer({
    first_name,
    last_name,
    phone,
    email,
  });
};

const updateCustomerById = async (id, updatedData) => {
  if (!updatedData || Object.keys(updatedData).length === 0) {
    const error = new Error("No update data provided");
    error.statusCode = 400;
    throw error;
  }

  const customer = await customerRepository.getCustomerById(id);

  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  const sanitisedData = {
    ...updatedData,
  };

  if (sanitisedData.first_name) {
    sanitisedData.first_name = sanitisedData.first_name.trim();
  }

  if (sanitisedData.last_name) {
    sanitisedData.last_name = sanitisedData.last_name.trim();
  }

  if (sanitisedData.email) {
    sanitisedData.email = sanitisedData.email.trim().toLowerCase();
  }

  if (sanitisedData.phone) {
    sanitisedData.phone = sanitisedData.phone.replace(/\s+/g, "");
  }

  if (sanitisedData.email) {
    const existingCustomer = await customerRepository.findCustomerByEmail(
      sanitisedData.email,
    );

    if (existingCustomer && existingCustomer.id !== id) {
      const error = new Error("Email already in use");

      error.statusCode = 400;

      throw error;
    }
  }

  if (sanitisedData.phone) {
    const existingCustomer = await customerRepository.findCustomerByPhone(
      sanitisedData.phone,
    );

    if (existingCustomer && existingCustomer.id !== id) {
      const error = new Error("Phone number already in use");

      error.statusCode = 400;

      throw error;
    }
  }

  return customerRepository.updateCustomerById(id, sanitisedData);
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
};
