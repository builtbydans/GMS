const express = require("express");
const router = express.Router();

const {
  getVehicles,
  getVehiclesByCustomerId,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("./vehicle.controller");

const { validateBody } = require("../../middleware/validate.middleware");
const {
  createVehicleSchema,
  updateVehicleSchema,
} = require("../../schemas/vehicle.schema");

router.get("/", getVehicles);
router.get("/customer/:customerId", getVehiclesByCustomerId);
router.post("/", validateBody(createVehicleSchema), createVehicle);
router.put("/:id", validateBody(updateVehicleSchema), updateVehicle);
router.delete("/:id", deleteVehicle);

module.exports = router;
