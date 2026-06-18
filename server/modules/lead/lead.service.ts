import { CreateLeadDto } from "../../types/lead.types";
const AppError = require("../../errors/AppError");
const customerService = require("../customer/customer.service");
const vehicleService = require("../vehicle/vehicle.service");
const jobService = require("../job/job.service");

const getLeads = async () => {
  return await jobService.getLeads();
};

const createLead = async (leadData: CreateLeadDto) => {
  let {
    first_name,
    last_name,
    email,
    phone,
    registration,
    make,
    model,
    message,
  } = leadData;

  if (!first_name) {
    throw new AppError("First name is required", 400);
  }

  if (!last_name) {
    throw new AppError("Last name is required", 400);
  }

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email format", 400);
  }

  if (!phone) {
    throw new AppError("Phone number is required", 400);
  }

  if (!registration) {
    throw new AppError("Vehicle registration is required", 400);
  }

  if (!make) {
    throw new AppError("Vehicle make is required", 400);
  }

  if (!model) {
    throw new AppError("Vehicle model is required", 400);
  }

  if (!message) {
    throw new AppError("Message is required", 400);
  }

  const customer = await customerService.createCustomer({
    first_name,
    last_name,
    email,
    phone,
  });

  const vehicle = await vehicleService.createVehicle({
    customer_id: customer.id,
    registration,
    make,
    model,
  });

  const lead = await jobService.createJob({
    vehicle_id: vehicle.id,
    description: message,
  });

  return lead;
};

module.exports = {
  createLead,
  getLeads,
};
