import { Request, Response, NextFunction } from "express";
const customerService = require("./customer.service");

const getCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const customers = await customerService.getCustomers();

    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const customer = await customerService.getCustomerById(id);

    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const customerData = req.body;

    const newCustomer = await customerService.createCustomer(customerData);

    return res.status(201).json({
      success: true,
      data: newCustomer,
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedCustomer = await customerService.updateCustomerById(
      id,
      updatedData,
    );

    return res.status(200).json({
      success: true,
      data: updatedCustomer,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const deletedCustomer = await customerService.deleteCustomerById(id);

    return res.status(200).json({
      success: true,
      data: deletedCustomer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
