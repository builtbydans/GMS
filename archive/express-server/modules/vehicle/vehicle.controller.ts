import { Request, Response, NextFunction } from "express";
const vehicleService = require("./vehicle.service");

const getVehicles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vehicles = await vehicleService.getVehicles();

    return res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
};

const getVehiclesByCustomerId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { customerId } = req.params;

    const vehicles = await vehicleService.getVehiclesByCustomerId(customerId);

    return res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
};

const createVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vehicleData = req.body;

    const newVehicle = await vehicleService.createVehicle(vehicleData);

    return res.status(201).json({
      success: true,
      data: newVehicle,
    });
  } catch (error) {
    next(error);
  }
};

const updateVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const updatedVehicleData = req.body;
    const updatedVehicle = await vehicleService.updateVehicleById(
      id,
      updatedVehicleData,
    );

    return res.status(200).json({
      success: true,
      data: updatedVehicle,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const deletedVehicle = await vehicleService.deleteVehicleById(id);

    return res.status(200).json({
      success: true,
      data: deletedVehicle,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVehicles,
  getVehiclesByCustomerId,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
