const express = require("express");
const router = express.Router();

const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("./employee.controller");

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);

router.post("/", createEmployee);
router.patch("/:id", updateEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
