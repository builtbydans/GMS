const express = require("express");
const router = express.Router();

const {
  getVehicles,
  getVehiclesByCustomerId,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("./vehicleController");

router.get("/", getVehicles);
router.get("/customer/:customerId", getVehiclesByCustomerId);
router.post("/", createVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

module.exports = router;
