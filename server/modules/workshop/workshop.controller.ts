import { Request, Response, NextFunction } from "express";

const employeeService = require("../employee/employee.service");

const getTechnicians = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const technicians = await employeeService.getTechnicians();

    return res.status(200).json({
      success: true,
      data: technicians,
    });
  } catch (error) {
    next(error);
  }
};

const clockIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await employeeService.clockIn(
      req.body.employeeId,
      req.body.pin,
    );

    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTechnicians,
  clockIn,
};
