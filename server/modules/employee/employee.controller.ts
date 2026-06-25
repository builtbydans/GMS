import { Request, Response, NextFunction } from "express";
const employeeService = require("./employee.service");

const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employees = await employeeService.getEmployees();

    return res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const employee = await employeeService.getEmployeeById(id);

    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employee = await employeeService.createEmployee(req.body);

    return res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const employee = await employeeService.updateEmployee(id, req.body);

    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

const changeEmployeePin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    await employeeService.changeEmployeePin(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Employee PIN changed successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    await employeeService.deleteEmployee(id);

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  changeEmployeePin,
  deleteEmployee,
};
