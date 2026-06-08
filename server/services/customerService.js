const customerRepository = require("../repositories/customer/customerRepository");
const auditRepository = require("../repositories/audit/auditRepository");

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
    throw new AppError("Customer not found", 404);
  }

  const existingCustomer = await customerRepository.findCustomerByEmail(email);

  if (existingCustomer) {
    throw new AppError("Email already in use", 400);
  }

  console.log("auditRepository:", auditRepository);

  const customer = await customerRepository.createCustomer({
    first_name,
    last_name,
    phone,
    email,
  });

  await auditRepository.createAuditLog({
    entity_type: "customer",
    entity_id: customer.id,
    action: "CREATE",
    old_value: null,
    new_value: customer,
  });

  return customer;
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

const deleteCustomerById = async (id) => {
  const customer = await customerRepository.deleteCustomerById(id);

  if (!customer) {
    throw new AppError("Customer not found", 404);
  }

  return customer;
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
