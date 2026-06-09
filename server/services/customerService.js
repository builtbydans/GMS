const customerRepository = require("../repositories/customer/customerRepository");
const auditRepository = require("../repositories/audit/auditRepository");
const AppError = require("../errors/AppError");

const getCustomers = async () => {
  return customerRepository.getCustomers();
};

const getCustomerById = async (id) => {
  const customer = await customerRepository.getCustomerById(id);

  if (!customer) {
    throw new AppError("Customer not found", 404);
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
    throw new AppError("First name and last name required", 400);
  }

  const existingCustomer = await customerRepository.findCustomerByEmail(email);

  if (existingCustomer) {
    throw new AppError("Email already in use", 400);
  }

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
    throw new AppError("No update provided", 400);
  }

  const customer = await customerRepository.getCustomerById(id);

  if (!customer) {
    throw new AppError("Customer not found", 404);
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
      throw new AppError("Email already in use", 400);
    }
  }

  if (sanitisedData.phone) {
    const existingCustomer = await customerRepository.findCustomerByPhone(
      sanitisedData.phone,
    );

    if (existingCustomer && existingCustomer.id !== id) {
      throw new AppError("Phone number already in use", 400);
    }
  }

  const updatedCustomer = await customerRepository.updateCustomerById(
    id,
    sanitisedData,
  );

  await auditRepository.createAuditLog({
    entity_type: "customer",
    entity_id: id,
    action: "UPDATE",
    old_value: customer,
    new_value: updatedCustomer,
  });

  return updatedCustomer;
};

const deleteCustomerById = async (id) => {
  const existingCustomer = await customerRepository.getCustomerById(id);

  if (!existingCustomer) {
    throw new AppError("Customer not found", 404);
  }

  const deletedCustomer = await customerRepository.deleteCustomerById(id);

  await auditRepository.createAuditLog({
    entity_type: "customer",
    entity_id: id,
    action: "DELETE",
    old_value: existingCustomer,
    new_value: deletedCustomer,
  });

  return deletedCustomer;
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
