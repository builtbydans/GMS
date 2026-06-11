const express = require("express");
const router = express.Router();

const {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("./vehicleController");

router.get("/", getVehicles);
router.post("/", createVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

module.exports = router;
