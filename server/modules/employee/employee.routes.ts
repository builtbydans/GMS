const express = require("express");
const router = express.Router();

const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  changeEmployeePin,
  deleteEmployee,
} = require("./employee.controller");

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);

router.post("/", createEmployee);
router.patch("/:id", updateEmployee);
router.put("/:id", updateEmployee);
router.patch("/:id/pin", changeEmployeePin);
router.delete("/:id", deleteEmployee);

module.exports = router;
