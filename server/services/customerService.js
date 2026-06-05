const customerRepository = require("../repositories/customerRepository");

const createCustomer = async (customerData) => {
  let { first_name, last_name, phone, email } = customerData;

  // Sanitise
  first_name = first_name?.trim();
  last_name = last_name?.trim();
  phone = phone?.trim();
  email = email?.trim().toLowerCase();

  // Validation
  if (!first_name || !last_name) {
    const error = new Error("First name and last name are required");
    error.statusCode = 400;
    throw error;
  }

  // Business Rule
  const existingCustomer = await customerRepository.findCustomerByEmail(email);

  if (existingCustomer) {
    const error = new Error("A customer with this email already exists");

    error.statusCode = 400;
    throw error;
  }

  // Database
  return customerRepository.createCustomer({
    first_name,
    last_name,
    phone,
    email,
  });
};

module.exports = {
  createCustomer,
};
